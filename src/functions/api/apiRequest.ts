import * as sampleData from '../../assets/data/L40TH.json';
import { RestaurantType } from '../../types/restaurant';
import { API_URLS } from '../../configs/api';

export type SearchResult =
  | { ok: true; restaurants: RestaurantType[] }
  | { ok: false; reason: 'invalid_postcode' | 'api_error' };

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickRandomTen(restaurants: RestaurantType[]): RestaurantType[] {
  if (restaurants.length <= 10) {
    return restaurants;
  }
  return shuffleArray(restaurants).slice(0, 10);
}

export async function validatePostcode(postcode: string): Promise<boolean> {
  try {
    const response = await fetch(API_URLS.POSTCODE_VALIDATION_URL(postcode), { method: 'GET' });
    const data = await response.json();
    return data.result === true;
  } catch {
    return false;
  }
}

export async function fetchRestaurantsFromJustEat(postcode: string): Promise<RestaurantType[] | null> {
  try {
    const response = await fetch(API_URLS.JUST_EAT_API_URL(postcode), { method: 'GET' });
    const apiData = await response.json();
    const restaurants = apiData.restaurants;
    if (restaurants) {
      return pickRandomTen(restaurants);
    }
  } catch {
    return null;
  }
  return null;
}

export async function handleSearch(postcode: string): Promise<SearchResult> {
  if (!postcode || postcode === 'L40TH') {
    const restaurants = await new Promise<RestaurantType[]>((resolve) => {
      setTimeout(() => {
        resolve(pickRandomTen(sampleData.restaurants as RestaurantType[]));
      }, 1000);
    });
    return { ok: true, restaurants };
  }

  const POSTCODE_VALIDATION_TIMEOUT = new Promise<string>((resolve) =>
    setTimeout(() => resolve('TIMEOUT'), 3000)
  );

  const validationResult = await Promise.race([
    validatePostcode(postcode),
    POSTCODE_VALIDATION_TIMEOUT,
  ]);

  if (validationResult === 'TIMEOUT' || validationResult === true) {
    const restaurants = await fetchRestaurantsFromJustEat(postcode);
    if (restaurants === null) {
      return { ok: false, reason: 'api_error' };
    }
    return { ok: true, restaurants };
  }

  return { ok: false, reason: 'invalid_postcode' };
}
