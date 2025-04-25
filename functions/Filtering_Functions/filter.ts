import { cuisineEmojiMatch } from './cuisine-emoji-match';


/**
 * Function to match the cuisine names with emojis.
 * @param item - each restaurant object
 * @returns a string of text of all cuisines
 */
export function filterCuisines(item: any): string {
    return item.cuisines
      .slice(0, 2)
      .map((cuisine: any) => {
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
