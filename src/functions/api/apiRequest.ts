import * as sampleData from '../../assets/data/L40TH.json';
import { RestaurantType } from '../../types/restaurant';
import { API_TIMEOUTS, API_URLS, SAMPLE_DATA_DELAY_MS, SAMPLE_POSTCODE } from '../../configs/api';

export type SearchResult =
  | { ok: true; restaurants: RestaurantType[] }
  | { ok: false; reason: 'invalid_postcode' | 'network_error' | 'api_error' };

type ValidationOutcome = boolean | 'TIMEOUT' | 'VALIDATION_ERROR';

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

async function fetchJson(url: string, signal?: AbortSignal): Promise<any> {
  const response = await fetch(url, { method: 'GET', signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

async function getSampleRestaurants(): Promise<RestaurantType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pickRandomTen(sampleData.restaurants as RestaurantType[]));
    }, SAMPLE_DATA_DELAY_MS);
  });
}

export async function validatePostcode(postcode: string, signal?: AbortSignal): Promise<boolean> {
  const data = await fetchJson(API_URLS.POSTCODE_VALIDATION_URL(postcode), signal);
  return data.result === true;
}

export async function fetchRestaurantsFromJustEat(postcode: string): Promise<RestaurantType[] | null> {
  try {
    const apiData = await fetchJson(API_URLS.JUST_EAT_API_URL(postcode));
    const restaurants = apiData.restaurants;
    if (Array.isArray(restaurants)) {
      return pickRandomTen(restaurants);
    }
    return null;
  } catch {
    return null;
  }
}

export async function handleSearch(postcode: string): Promise<SearchResult> {
  const cleanedPostcode = postcode.trim();

  if (!cleanedPostcode) {
    return { ok: false, reason: 'invalid_postcode' };
  }

  if (__DEV__ && cleanedPostcode === SAMPLE_POSTCODE) {
    return { ok: true, restaurants: await getSampleRestaurants() };
  }

  const validationController = new AbortController();
  let validationTimerId: ReturnType<typeof setTimeout> | undefined;

  try {
    const guardedValidation: Promise<ValidationOutcome> = validatePostcode(
      cleanedPostcode,
      validationController.signal
    ).then(
      (isValid) => isValid,
      () => 'VALIDATION_ERROR'
    );

    const validationTimeout = new Promise<ValidationOutcome>((resolve) => {
      validationTimerId = setTimeout(() => {
        validationController.abort();
        resolve('TIMEOUT');
      }, API_TIMEOUTS.POSTCODE_VALIDATION);
    });

    const validationOutcome = await Promise.race([guardedValidation, validationTimeout]);
    clearTimeout(validationTimerId);

    if (validationOutcome === false) {
      return { ok: false, reason: 'invalid_postcode' };
    }
    if (validationOutcome === 'VALIDATION_ERROR') {
      return { ok: false, reason: 'network_error' };
    }

    const restaurants = await fetchRestaurantsFromJustEat(cleanedPostcode);
    if (restaurants === null) {
      return { ok: false, reason: 'api_error' };
    }
    return { ok: true, restaurants };
  } finally {
    clearTimeout(validationTimerId);
  }
}
