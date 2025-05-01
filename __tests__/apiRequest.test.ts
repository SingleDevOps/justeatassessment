import {
  validatePostcode,
  handleSearch,
} from '../functions/API_Functions/apiRequest';


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



  describe('fetchRestaurantsFromJustEat', () => {
    const mockPostcode = 'sw1a1aa';

  describe('handleSearch', () => {
    const mockRestaurants = [{ id: '1', name: 'Testaurant' }];

    it('should fetch restaurants if validation succeeds', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ result: true }));
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ restaurants: mockRestaurants }));

      const result = await handleSearch(mockPostcode);

      expect(fetch).toHaveBeenCalledTimes(2); // 1 for validatePostcode, 1 for fetchRestaurantsFromJustEat
      expect(fetch).toHaveBeenNthCalledWith(1, `https://postcodes.io/postcodes/${mockPostcode}/validate`, { method: 'GET' });
      expect(fetch).toHaveBeenNthCalledWith(2, `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${mockPostcode}`, { method: 'GET' });
      expect(result).toEqual(mockRestaurants);
    });

    it('should return false if validation fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ result: false }));
      let tempMockPostcode = '11111'; // Invalid Postcode
      const result = await handleSearch(tempMockPostcode);

      expect(fetch).toHaveBeenCalledTimes(1); // Only validatePostcode is called
      expect(fetch).toHaveBeenCalledWith(`https://postcodes.io/postcodes/${tempMockPostcode}/validate`, { method: 'GET' });
      expect(result).toBe(false);
    });

    it('should fetch restaurants directly if validation times out', async () => {
      jest.useFakeTimers();

      // Mock validatePostcode to simulate timeout
      (fetch as jest.Mock).mockImplementationOnce(url => {
        if (url.includes('postcodes.io')) {
          return new Promise(() => {}); // Never resolves
        }
        return Promise.reject(new Error('Unexpected fetch call'));
      });
      // Mock fetchRestaurantsFromJustEat
      (fetch as jest.Mock).mockResolvedValueOnce(createMockResponse({ restaurants: mockRestaurants }));

      const searchPromise = handleSearch(mockPostcode);

      // Timer to simulate TIMEOUT
      jest.advanceTimersByTime(3001);

      const result = await searchPromise;

      expect(fetch).toHaveBeenCalledTimes(2); // 1 for validatePostcode, 1 for fetchRestaurantsFromJustEat
      expect(fetch).toHaveBeenNthCalledWith(1, `https://postcodes.io/postcodes/${mockPostcode}/validate`, { method: 'GET' });
      expect(fetch).toHaveBeenNthCalledWith(2, `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${mockPostcode}`, { method: 'GET' });
      expect(result).toEqual(mockRestaurants);

      jest.useRealTimers();
    });
  });
  });
});
});
