import { cuisineEmojiMatch } from '../../configs/cuisineEmojiMatch';
import { RestaurantType, CuisineType } from '../../types/restaurant';

const emojiEntries = Object.entries(cuisineEmojiMatch)
  .sort(([a], [b]) => b.length - a.length);

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchEmoji(cuisineName: string): string | null {
  const lower = cuisineName.toLowerCase();
  for (const [key, emoji] of emojiEntries) {
    const pattern = new RegExp(`(?:^|[\\s_\\-&/]+)${escapeRegex(key)}(?:[\\s_\\-&/]+|$)`, 'i');
    if (pattern.test(lower)) {
      return emoji;
    }
  }
  return null;
}

export function filterCuisines(item: RestaurantType): string {
  return item.cuisines
    .slice(0, 2)
    .map((cuisine: CuisineType) => {
      const emoji = matchEmoji(cuisine.name);
      return emoji ? `${emoji} ${cuisine.name}` : cuisine.name;
    })
    .join(', ');
}
