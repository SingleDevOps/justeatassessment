/**
 * Sort an array of restaurants by their nested rating.starRating.
 *
 * @param {Array} restaurants - Array of restaurant objects.
 * @param {string} order - 'asc' or 'dsc' for different sorting order.
 * @returns {Array} - A new sorted array.
 */
export function sortResData(restaurants, order: string) {
    const sortedRestaurants = [...restaurants];
    sortedRestaurants.sort((resA, resB) => {
        const resArating = resA.rating.starRating;
        const resBrating = resB.rating.starRating;
        return order === 'asc' ? resArating - resBrating : resBrating - resArating;
    });

    return sortedRestaurants;
}
