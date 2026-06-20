import { RestaurantType } from '../../types/restaurant';

export const SEARCH_RESULT_LIMIT = 10;

function matchesQuery(obj: unknown, query: string): boolean {
  if (obj === null || obj === undefined) { return false; }
  if (typeof obj === 'string') { return obj.toLowerCase().includes(query); }
  if (typeof obj === 'number') { return obj.toString().includes(query); }
  if (typeof obj === 'boolean') { return obj ? 'true'.includes(query) : 'false'.includes(query); }
  if (Array.isArray(obj)) { return obj.some(item => matchesQuery(item, query)); }
  if (typeof obj === 'object') { return Object.values(obj).some(val => matchesQuery(val, query)); }
  return false;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function filterRestaurants(restaurants: RestaurantType[], query: string): RestaurantType[] {
  if (!query.trim()) { return restaurants; }
  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0);
  if (keywords.length === 0) { return restaurants; }
  return restaurants.filter(r => keywords.every(kw => matchesQuery(r, kw)));
}
