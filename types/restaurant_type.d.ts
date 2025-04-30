/* The first three types below define the structure of Restaurant Object */
type RatingType = {
    starRating: number;
    count: number;
};

type AddressType = {
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

export type RestaurantCardPropType = {
    item: RestaurantType; // Each restaurant object
    isDarkMode: boolean;
    cuisines: string;
};
