import {
  validatePostcode,
  fetchRestaurantsFromJustEat,
  handleSearch,
} from '../functions/api/apiRequest';

global.fetch = jest.fn();

const createMockResponse = (body: any, ok: boolean = true, status = 200): Response => {
  return {
    ok,
    status,
    json: () => Promise.resolve(body),
  } as Response;
};

describe('API Functions', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    jest.useRealTimers();
  });

  describe('validatePostcode', () => {
    it('should return valid for a valid postcode', async () => {
      const mockPostcode = 'SW1A0AA';
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({ result: true })
      );

      const result = await validatePostcode(mockPostcode);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://postcodes.io/postcodes/${mockPostcode}/validate`,
        { method: 'GET' }
      );
      expect(result).toBe('valid');
    });

    it('should return invalid for an invalid postcode', async () => {
      const mockPostcode = '12345';
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({ result: false })
      );

      const result = await validatePostcode(mockPostcode);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBe('invalid');
    });

    it('should return invalid when the postcode is not found (404)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({}, false, 404)
      );

      const result = await validatePostcode('XXXX XXX');

      expect(result).toBe('invalid');
    });

    it('should return error for a server error response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({}, false, 500)
      );

      const result = await validatePostcode('SW1A0AA');

      expect(result).toBe('error');
    });

    it('should return error when the request fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('network down'));

      const result = await validatePostcode('SW1A0AA');

      expect(result).toBe('error');
    });
  });

  describe('fetchRestaurantsFromJustEat', () => {
    it('should return restaurants when API responds with data', async () => {
      const mockRestaurants = [
        { id: '1', name: 'Testaurant' },
        { id: '2', name: 'Food Place' },
      ];
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({ restaurants: mockRestaurants })
      );

      const result = await fetchRestaurantsFromJustEat('SW1A0AA');

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ restaurants: mockRestaurants });
    });

    it('should return null when API returns no restaurants', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({ restaurants: null })
      );

      const result = await fetchRestaurantsFromJustEat('INVALID');

      expect(result).toBeNull();
    });

    it('should return null for an error status response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({ message: 'oops' }, false, 500)
      );

      const result = await fetchRestaurantsFromJustEat('SW1A0AA');

      expect(result).toBeNull();
    });
  });

  describe('handleSearch', () => {
    const mockRestaurants = [{ id: '1', name: 'Testaurant' }];
    const mockPostcodeInput = 'sw1a1aa';
    const mockPostcode = 'SW1A1AA';

    it('should reject an empty postcode without calling the API', async () => {
      const result = await handleSearch('');

      expect(fetch).not.toHaveBeenCalled();
      expect(result).toEqual({ ok: false, reason: 'invalid_postcode' });
    });

    it('should serve the offline demo dataset for L40TH regardless of case', async () => {
      jest.useFakeTimers();

      const searchPromise = handleSearch('l40th');
      jest.advanceTimersByTime(1001);
      const result = await searchPromise;

      expect(fetch).not.toHaveBeenCalled();
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.restaurants.length).toBeLessThanOrEqual(10);
        expect(result.allRestaurants.length).toBeGreaterThan(10);
        expect(result.metaData?.postalCode).toBe('L40TH');
      }

      jest.useRealTimers();
    });

    it('should fetch restaurants if validation succeeds', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ result: true }));
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ restaurants: mockRestaurants }));

      const result = await handleSearch(mockPostcodeInput);

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenNthCalledWith(1, `https://postcodes.io/postcodes/${mockPostcode}/validate`, { method: 'GET' });
      expect(fetch).toHaveBeenNthCalledWith(2, `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${mockPostcode}`, { method: 'GET' });
      expect(result).toEqual({ ok: true, restaurants: mockRestaurants, allRestaurants: mockRestaurants });
    });

    it('should return invalid_postcode if validation fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ result: false }));
      const result = await handleSearch('11111');

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ok: false, reason: 'invalid_postcode' });
    });

    it('should fetch restaurants directly if validation times out', async () => {
      jest.useFakeTimers();

      (fetch as jest.Mock).mockImplementationOnce((url: string) => {
        if (url.includes('postcodes.io')) {
          return new Promise(() => {});
        }
        return Promise.reject(new Error('Unexpected fetch call'));
      });
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ restaurants: mockRestaurants }));

      const searchPromise = handleSearch(mockPostcodeInput);

      jest.advanceTimersByTime(3001);

      const result = await searchPromise;

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenNthCalledWith(1, `https://postcodes.io/postcodes/${mockPostcode}/validate`, { method: 'GET' });
      expect(fetch).toHaveBeenNthCalledWith(2, `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${mockPostcode}`, { method: 'GET' });
      expect(result).toEqual({ ok: true, restaurants: mockRestaurants, allRestaurants: mockRestaurants });

      jest.useRealTimers();
    });

    it('should fall back to the live API when validation errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('postcodes.io down'));
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ restaurants: mockRestaurants }));

      const result = await handleSearch(mockPostcodeInput);

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ ok: true, restaurants: mockRestaurants, allRestaurants: mockRestaurants });
    });

    it('should return api_error when both validation errors and the live API fails', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('everything down'));

      const result = await handleSearch(mockPostcodeInput);

      expect(result).toEqual({ ok: false, reason: 'api_error' });
    });
  });
});
