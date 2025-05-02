import { cuisineEmojiMatch } from '../../configs/cuisine-emoji-match';
import { RestaurantType, CuisineType } from '../../types/restaurant_type';

/**
 * Function to match the cuisine names with emojis.
 * @param item - each restaurant object
 * @returns a string of text of all cuisines
 */


export function filterCuisines(item: RestaurantType): string {
  return item.cuisines
    .slice(0, 2)
    .map((cuisine: CuisineType) => {
      const name = cuisine.name;
      const lower = name.toLowerCase();
      for (const key in cuisineEmojiMatch) {
        if (lower.includes(key)) {
          return `${cuisineEmojiMatch[key]} ${name}`;
        }
      }
      return name;
    })
    .join(', ');
}
