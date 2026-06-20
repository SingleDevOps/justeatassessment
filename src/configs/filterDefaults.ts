import { FilterState, DEFAULT_FILTERS } from '../types/filterOptions';

export const RATING_OPTIONS = [
    { label: 'Any', value: 0 },
    { label: '3+', value: 3 },
    { label: '3.5+', value: 3.5 },
    { label: '4+', value: 4 },
    { label: '4.5+', value: 4.5 },
];

export const DELIVERY_COST_OPTIONS = [
    { label: 'Any', value: 10 },
    { label: '£1', value: 1 },
    { label: '£2', value: 2 },
    { label: '£3', value: 3 },
    { label: '£5', value: 5 },
];

export type CuisineOption = {
    name: string;
    uniqueName: string;
    emoji: string;
};

export const TOP_CUISINES: CuisineOption[] = [
    { name: 'Pizza', uniqueName: 'pizza', emoji: '🍕' },
    { name: 'Burgers', uniqueName: 'burgers', emoji: '🍔' },
    { name: 'Chicken', uniqueName: 'chicken', emoji: '🍗' },
    { name: 'Kebab', uniqueName: 'kebabs', emoji: '🍖' },
    { name: 'Indian', uniqueName: 'indian', emoji: '🇮🇳' },
    { name: 'Chinese', uniqueName: 'chinese', emoji: '🥡' },
    { name: 'Breakfast', uniqueName: 'breakfast', emoji: '🍳' },
    { name: 'Sandwiches', uniqueName: 'sandwiches', emoji: '🥪' },
    { name: 'Desserts', uniqueName: 'desserts', emoji: '🍰' },
    { name: 'American', uniqueName: 'american', emoji: '🇺🇸' },
    { name: 'Fish & Chips', uniqueName: 'fish-and-chips', emoji: '🐟🍟' },
    { name: 'Italian', uniqueName: 'italian', emoji: '🇮🇹' },
    { name: 'Curry', uniqueName: 'curry', emoji: '🍛' },
    { name: 'Mexican', uniqueName: 'mexican', emoji: '🇲🇽' },
    { name: 'Halal', uniqueName: 'halal', emoji: 'Halal' },
    { name: 'Sushi', uniqueName: 'sushi', emoji: '🍣' },
    { name: 'Coffee', uniqueName: 'coffee', emoji: '☕' },
    { name: 'Milkshakes', uniqueName: 'milkshakes', emoji: '🥤' },
    { name: 'Vegetarian', uniqueName: 'vegetarian', emoji: '🥑' },
    { name: 'Asian', uniqueName: 'asian', emoji: '🥢' },
    { name: 'Greek', uniqueName: 'greek', emoji: '🇬🇷' },
    { name: 'Healthy', uniqueName: 'healthy', emoji: '💚' },
    { name: 'Pasta', uniqueName: 'pasta', emoji: '🍝' },
    { name: 'Steak', uniqueName: 'steak', emoji: '🥩' },
    { name: 'Alcohol', uniqueName: 'alcohol', emoji: '🍺' },
];

export const DEFAULT_FILTER_STATE: FilterState = { ...DEFAULT_FILTERS };
