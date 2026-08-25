import { cuisineEmojiMatch } from '../../configs/cuisineEmojiMatch';
import { RestaurantType, CuisineType } from '../../types/restaurant';

type EmojiMatcher = {
    key: string;
    emoji: string;
    pattern: RegExp;
};

// Longest keys first so e.g. "fish-and-chips" wins over "chips"-style overlaps.
const emojiMatchers: EmojiMatcher[] = Object.entries(cuisineEmojiMatch)
  .sort(([a], [b]) => b.length - a.length)
  .map(([key, emoji]) => ({
      key,
      emoji,
      pattern: new RegExp(`(?:^|[\\s_\\-&/]+)${escapeRegex(key)}(?:[\\s_\\-&/]+|$)`, 'i'),
  }));

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchEmoji(cuisineName: string): string | null {
  for (const { emoji, pattern } of emojiMatchers) {
    if (pattern.test(cuisineName)) {
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
