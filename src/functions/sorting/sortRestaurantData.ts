import { RestaurantType } from '../../types/restaurant_type';
import { SortOrder } from '../../configs/sortingOptions';

/**
 * Sort an array of restaurants by their nested rating.starRating.
 *
 * @param {RestaurantType[]} restaurants - Array of restaurant objects.
 * @param {string} order
 * @returns {RestaurantType[]} - A new sorted array.
 */
export function sortResData(restaurants: RestaurantType[], order: string): RestaurantType[] {
    const sortedRestaurants = [...restaurants];

    if (order === SortOrder.ASC || order === SortOrder.DESC) {
        sortedRestaurants.sort((resA, resB) => {
            const resArating = resA.rating.starRating;
            const resBrating = resB.rating.starRating;
            return order === SortOrder.ASC ? resArating - resBrating : resBrating - resArating;
        });
    }

    else if (order === SortOrder.A_Z || order === SortOrder.Z_A) {
        sortedRestaurants.sort((resA, resB) => {
            const resAName = resA.name.toLowerCase();
            const resBName = resB.name.toLowerCase();
            return order === SortOrder.A_Z ? resAName.localeCompare(resBName) : resBName.localeCompare(resAName);
        });
    }

    else if (order === SortOrder.MORE_TO_LESS_COUNT || order === SortOrder.LESS_TO_MORE_COUNT) {
        sortedRestaurants.sort((resA, resB) => {
            const resARatingCount = resA.rating.count;
            const resBRatingCount = resB.rating.count;
            return order === SortOrder.LESS_TO_MORE_COUNT ? resARatingCount - resBRatingCount : resBRatingCount - resARatingCount;
        });
    }

    return sortedRestaurants;
}
