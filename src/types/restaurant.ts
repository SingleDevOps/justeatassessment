export type RatingType = {
    starRating: number;
    count: number;
    userRating: number | null;
};

export type AddressType = {
    firstLine: string;
    city: string;
    postalCode: string;
    location?: {
        type: string;
        coordinates: [number, number];
    };
};

export type CuisineType = {
    name: string;
    uniqueName?: string;
};

export type DealType = {
    description: string;
    offerType: string;
};

export type EtaMinutesType = {
    rangeLower?: number;
    rangeUpper?: number;
    approximate?: number;
};

export type AvailabilitySlotType = {
    isOpen: boolean;
    canPreOrder: boolean;
    isTemporarilyOffline: boolean;
    nextAvailability?: {
        from: string;
    };
    etaMinutes?: EtaMinutesType;
};

export type AvailabilityType = {
    delivery?: AvailabilitySlotType;
    collection?: AvailabilitySlotType;
};

export type RestaurantType = {
    id: string | number;
    logoUrl: string;
    name: string;
    uniqueName?: string;
    cuisines: CuisineType[];
    rating: RatingType;
    address: AddressType;
    isNew?: boolean;
    driveDistanceMeters?: number;
    openingTimeLocal?: string;
    deliveryOpeningTimeLocal?: string;
    deliveryEtaMinutes?: EtaMinutesType;
    isCollection?: boolean;
    isDelivery?: boolean;
    isOpenNowForCollection?: boolean;
    isOpenNowForDelivery?: boolean;
    isOpenNowForPreorder?: boolean;
    isTemporarilyOffline?: boolean;
    deliveryCost?: number;
    minimumDeliveryValue?: number;
    defaultDisplayRank?: number;
    isTemporaryBoost?: boolean;
    isPremier?: boolean;
    isTestRestaurant?: boolean;
    deals?: DealType[];
    tags?: string[];
    availability?: AvailabilityType;
};
