import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantType } from './restaurant';

export type RootStackParamList = {
    MainPage: undefined;
    DisplayPage: { postcode: string; restaurants: RestaurantType[] };
};

export type MainPageProps = NativeStackScreenProps<RootStackParamList, 'MainPage'>;
export type DisplayPageProps = NativeStackScreenProps<RootStackParamList, 'DisplayPage'>;
