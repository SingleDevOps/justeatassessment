export type FilterState = {
    openNow: boolean;
    delivery: boolean;
    collection: boolean;
    hasDeals: boolean;
    minRating: number;
    /** Upper bound in pounds; null means no cap ("Any"). */
    maxDeliveryCost: number | null;
    selectedCuisines: string[];
};

export const DEFAULT_FILTERS: FilterState = {
    openNow: false,
    delivery: false,
    collection: false,
    hasDeals: false,
    minRating: 0,
    maxDeliveryCost: null,
    selectedCuisines: [],
};
