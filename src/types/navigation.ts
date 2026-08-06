import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantType } from './restaurant';
import { DeliveryFeesEntryType, SearchEnrichmentType } from './searchData';

export type RootStackParamList = {
    MainPage: undefined;
    DisplayPage: { postcode: string; restaurants: RestaurantType[]; allRestaurants: RestaurantType[] } & Partial<SearchEnrichmentType>;
    RestaurantDetailPage: { restaurant: RestaurantType; deliveryFees?: DeliveryFeesEntryType };
};

export type MainPageProps = NativeStackScreenProps<RootStackParamList, 'MainPage'>;
export type DisplayPageProps = NativeStackScreenProps<RootStackParamList, 'DisplayPage'>;
export type DetailPageProps = NativeStackScreenProps<RootStackParamList, 'RestaurantDetailPage'>;
