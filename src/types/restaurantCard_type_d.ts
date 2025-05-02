import { RestaurantType } from './restaurant_type';

export type RestaurantCardPropType = {
    item: RestaurantType; // Each restaurant object
    isDarkMode: boolean;
    cuisines: string;
};
