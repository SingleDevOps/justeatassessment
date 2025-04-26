/**
 * Sort an array of restaurants by their nested rating.starRating.
 *
 * @param {Array} restaurants - Array of restaurant objects.
 * @param {string} order
 * @returns {Array} - A new sorted array.
 */
export function sortResData(restaurants:any[], order: string) {
    const sortedRestaurants = [...restaurants];

    if (order === 'asc' || order === 'desc'){
        sortedRestaurants.sort((resA, resB) => {
            const resArating = resA.rating.starRating;
            const resBrating = resB.rating.starRating;
            return order === 'asc' ? resArating - resBrating : resBrating - resArating;
        });
    }

    else if(order === 'A-Z' || order === 'Z-A'){
        sortedRestaurants.sort((resA, resB)=>{
            const resAName = resA.name.toLowerCase();
            const resBName = resB.name.toLowerCase();
            return order === 'A-Z' ? resAName.localeCompare(resBName) : resBName.localeCompare(resAName);
        });
    }

    else if (order === 'moreToLessRatingCount' || order === 'lessToMoreRatingCount'){
        sortedRestaurants.sort((resA, resB) => {
            const resARatingCount = resA.rating.count;
            const resBRatingCount = resB.rating.count;
            return order === 'lessToMoreRatingCount' ? resARatingCount - resBRatingCount : resBRatingCount - resARatingCount;
        });
    }

    return sortedRestaurants;
}
