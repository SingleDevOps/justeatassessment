/** Delivery fee bands; all amounts are in pence (minor units). */
export type FeeBandType = {
    minimumAmount: number;
    fee: number;
};

export type DeliveryFeesEntryType = {
    restaurantId: string;
    /** Minimum order value in pence (minor units). */
    minimumOrderValue: number;
    bands: FeeBandType[];
};

export type DeliveryFeesType = {
    restaurants: Record<string, DeliveryFeesEntryType>;
};

export type PromotedPlacementType = {
    filteredSearchPromotedLimit: number;
    rankedIds: string[];
    restaurants: Record<string, { restaurantId: string; defaultPromoted: boolean }>;
};

export type CuisineDetailType = {
    name: string;
    uniqueName: string;
    count: number;
};

export type MetaDataType = {
    canonicalName: string;
    district: string;
    postalCode: string;
    area: string;
    location?: {
        type: string;
        coordinates: number[];
    };
    cuisineDetails?: CuisineDetailType[];
};

export type FilterDefType = {
    displayName: string;
    imageName?: string;
    group?: string | null;
    restaurantIds: string[];
};

export type LayoutFilterItemType = {
    type: string;
    id: string;
    title?: string;
};

export type LayoutSectionType = {
    type: string;
    id: string;
    title?: string;
    contents: LayoutFilterItemType[];
};

export type SearchEnrichmentType = {
    metaData?: MetaDataType;
    deliveryFees?: DeliveryFeesType;
    promotedPlacement?: PromotedPlacementType;
    filters?: Record<string, FilterDefType>;
    layout?: Record<string, LayoutSectionType>;
};
