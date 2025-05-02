import { OptionType } from '../../types/selectListOption_type';

export const selectListOptions: OptionType[] = [ //Options for the sorting dropdown list.
    { key: '1', value: 'Rating (High to Low)' },
    { key: '2', value: 'Rating (Low to High)' },
    { key: '3', value: 'Rating Count (More to Less)' },
    { key: '4', value: 'Rating Count (Less to More)' },
    { key: '5', value: 'Name (A-Z)' },
    { key: '6', value: 'Name (Z-A)' },
];

export enum SortOrder { // Standardized Sorting Keys
    ASC = 'asc',
    DESC = 'desc',
    A_Z = 'A-Z',
    Z_A = 'Z-A',
    MORE_TO_LESS_COUNT = 'moreToLessRatingCount',
    LESS_TO_MORE_COUNT = 'lessToMoreRatingCount',
}

export enum SortOptionValue { //Standardized Sorting Values
    RATING_HIGH_LOW = 'Rating (High to Low)',
    RATING_LOW_HIGH = 'Rating (Low to High)',
    COUNT_MORE_LESS = 'Rating Count (More to Less)',
    COUNT_LESS_MORE = 'Rating Count (Less to More)',
    NAME_A_Z = 'Name (A-Z)',
    NAME_Z_A = 'Name (Z-A)',
}

