import { RestaurantType } from '../../types/restaurant';
import { FilterState } from '../../types/filterOptions';

export function applyFilters(restaurants: RestaurantType[], filters: FilterState): RestaurantType[] {
    let results = restaurants;

    if (filters.openNow) {
        results = results.filter(r => r.isOpenNowForDelivery || r.isOpenNowForCollection);
    }
    if (filters.delivery) {
        results = results.filter(r => r.isDelivery);
    }
    if (filters.collection) {
        results = results.filter(r => r.isCollection);
    }
    if (filters.hasDeals) {
        results = results.filter(r => r.deals && r.deals.length > 0);
    }
    if (filters.minRating > 0) {
        results = results.filter(r => r.rating.starRating >= filters.minRating);
    }
    if (filters.maxDeliveryCost !== null) {
        const maxCost = filters.maxDeliveryCost;
        results = results.filter(r => r.deliveryCost !== undefined && r.deliveryCost <= maxCost);
    }
    if (filters.selectedCuisines.length > 0) {
        results = results.filter(r =>
            r.cuisines.some(c => filters.selectedCuisines.includes(c.uniqueName ?? ''))
        );
    }

    return results;
}

export function applyRestaurantIdFilter(restaurants: RestaurantType[], restaurantIds: string[]): RestaurantType[] {
    if (!restaurantIds || restaurantIds.length === 0) {
        return restaurants;
    }
    const idSet = new Set(restaurantIds);
    return restaurants.filter(r => idSet.has(r.id.toString()));
}

export function countActiveFilters(filters: FilterState): number {
    let count = 0;
    if (filters.openNow) count++;
    if (filters.delivery) count++;
    if (filters.collection) count++;
    if (filters.hasDeals) count++;
    if (filters.minRating > 0) count++;
    if (filters.maxDeliveryCost !== null) count++;
    count += filters.selectedCuisines.length;
    return count;
}
