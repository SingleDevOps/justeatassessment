import {
  validatePostcode,
  fetchRestaurantsFromJustEat,
  handleSearch,
} from '../functions/api/apiRequest';

global.fetch = jest.fn();

const createMockResponse = (body: any, ok: boolean = true): Response => {
  return {
    ok,
    json: () => Promise.resolve(body),
  } as Response;
};

describe('API Functions', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    jest.useRealTimers();
  });

  describe('validatePostcode', () => {
    it('should return true for a valid postcode', async () => {
      const mockPostcode = 'SW1A0AA';
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({ result: true })
      );

      const isValid = await validatePostcode(mockPostcode);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://postcodes.io/postcodes/${mockPostcode}/validate`,
        { method: 'GET' }
      );
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid postcode', async () => {
      const mockPostcode = '12345';
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({ result: false })
      );

      const isValid = await validatePostcode(mockPostcode);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://postcodes.io/postcodes/${mockPostcode}/validate`,
        { method: 'GET' }
      );
      expect(isValid).toBe(false);
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
      expect(result).toEqual(mockRestaurants);
    });

    it('should return null when API returns no restaurants', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse({ restaurants: null })
      );

      const result = await fetchRestaurantsFromJustEat('INVALID');

      expect(result).toBeNull();
    });
  });

  describe('handleSearch', () => {
    const mockRestaurants = [{ id: '1', name: 'Testaurant' }];
    const mockPostcode = 'sw1a1aa';

    it('should fetch restaurants if validation succeeds', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ result: true }));
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ restaurants: mockRestaurants }));

      const result = await handleSearch(mockPostcode);

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

      const searchPromise = handleSearch(mockPostcode);

      jest.advanceTimersByTime(3001);

      const result = await searchPromise;

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenNthCalledWith(1, `https://postcodes.io/postcodes/${mockPostcode}/validate`, { method: 'GET' });
      expect(fetch).toHaveBeenNthCalledWith(2, `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${mockPostcode}`, { method: 'GET' });
      expect(result).toEqual({ ok: true, restaurants: mockRestaurants, allRestaurants: mockRestaurants });

      jest.useRealTimers();
    });
  });
});
