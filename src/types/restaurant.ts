export type RatingType = {
    starRating: number;
    count: number;
};

export type AddressType = {
    firstLine: string;
    city: string;
};

export type CuisineType = {
    name: string;
};

export type RestaurantType = {
    id: string | number;
    logoUrl: string;
    name: string;
    cuisines: CuisineType[];
    rating: RatingType;
    address: AddressType;
};
