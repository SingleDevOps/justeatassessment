export type FilterState = {
    openNow: boolean;
    delivery: boolean;
    collection: boolean;
    hasDeals: boolean;
    minRating: number;
    maxDeliveryCost: number;
    selectedCuisines: string[];
};

export const DEFAULT_FILTERS: FilterState = {
    openNow: false,
    delivery: false,
    collection: false,
    hasDeals: false,
    minRating: 0,
    maxDeliveryCost: 10,
    selectedCuisines: [],
};
