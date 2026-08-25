import * as sampleData from '../../assets/data/L40TH.json';
import { RestaurantType } from '../../types/restaurant';
import { SearchEnrichmentType } from '../../types/searchData';
import { API_URLS, API_TIMEOUTS } from '../../configs/api';
import { shuffleArray } from '../filtering/searchRestaurants';

export type SearchResult =
  | { ok: true; restaurants: RestaurantType[]; allRestaurants: RestaurantType[] } & Partial<SearchEnrichmentType>
  | { ok: false; reason: 'invalid_postcode' | 'api_error' };

export type PostcodeValidation = 'valid' | 'invalid' | 'error';

const DEMO_POSTCODE = 'L40TH';

function pickRandomTen(restaurants: RestaurantType[]): RestaurantType[] {
  if (restaurants.length <= 10) {
    return restaurants;
  }
  return shuffleArray(restaurants).slice(0, 10);
}

export async function validatePostcode(postcode: string): Promise<PostcodeValidation> {
  try {
    const response = await fetch(API_URLS.POSTCODE_VALIDATION_URL(postcode), { method: 'GET' });
    if (!response.ok) {
      // postcodes.io answers 404 for postcodes it does not recognise.
      return response.status === 404 ? 'invalid' : 'error';
    }
    const data = await response.json();
    return data.result === true ? 'valid' : 'invalid';
  } catch {
    return 'error';
  }
}

export async function fetchRestaurantsFromJustEat(postcode: string): Promise<{ restaurants: RestaurantType[] } & Partial<SearchEnrichmentType> | null> {
  try {
    const response = await fetch(API_URLS.JUST_EAT_API_URL(postcode), { method: 'GET' });
    if (!response.ok) {
      return null;
    }
    const apiData = await response.json();
    if (apiData.restaurants) {
      const enrichment: Partial<SearchEnrichmentType> = {};
      const knownKeys: (keyof SearchEnrichmentType)[] = ['metaData', 'deliveryFees', 'promotedPlacement', 'filters', 'layout'];
      knownKeys.forEach(key => {
        if (apiData[key] !== undefined) {
          enrichment[key] = apiData[key];
        }
      });
      return { restaurants: apiData.restaurants, ...enrichment };
    }
  } catch {
    return null;
  }
  return null;
}

export async function handleSearch(postcode: string): Promise<SearchResult> {
  const normalized = postcode.trim().toUpperCase();
  if (!normalized) {
    return { ok: false, reason: 'invalid_postcode' };
  }

  // Offline demo mode: the bundled L40TH dataset stands in for the live API
  // so the app remains fully explorable without network access.
  if (normalized === DEMO_POSTCODE) {
    const allRestaurants = sampleData.restaurants as RestaurantType[];
    const restaurants = await new Promise<RestaurantType[]>((resolve) => {
      setTimeout(() => {
        resolve(pickRandomTen(allRestaurants));
      }, 1000);
    });
    return {
      ok: true,
      restaurants,
      allRestaurants,
      metaData: sampleData.metaData,
      deliveryFees: sampleData.deliveryFees,
      promotedPlacement: sampleData.promotedPlacement,
      filters: sampleData.filters,
      layout: sampleData.layout,
    };
  }

  let validationTimeoutId: ReturnType<typeof setTimeout> | undefined;
  const validationTimeout = new Promise<'timeout'>((resolve) => {
    validationTimeoutId = setTimeout(() => resolve('timeout'), API_TIMEOUTS.POSTCODE_VALIDATION);
  });

  try {
    const validationResult = await Promise.race([
      validatePostcode(normalized),
      validationTimeout,
    ]);

    if (validationResult === 'invalid') {
      return { ok: false, reason: 'invalid_postcode' };
    }
  } finally {
    if (validationTimeoutId !== undefined) {
      clearTimeout(validationTimeoutId);
    }
  }

  // 'valid' plus validation timeouts/errors fall through to the live API so a
  // postcodes.io outage cannot block an otherwise working Just Eat lookup.
  const result = await fetchRestaurantsFromJustEat(normalized);
  if (result === null) {
    return { ok: false, reason: 'api_error' };
  }
  const { restaurants: allRestaurants, ...enrichment } = result;
  const restaurants = pickRandomTen(allRestaurants);
  return { ok: true, restaurants, allRestaurants, ...enrichment };
}
