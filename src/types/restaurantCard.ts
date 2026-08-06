import { RestaurantType } from './restaurant';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation';

export type RestaurantCardPropType = {
    item: RestaurantType;
    isDarkMode: boolean;
    cuisines: string;
    navigation: NativeStackNavigationProp<RootStackParamList, 'DisplayPage'>;
    distanceMeters?: number | null;
    distanceIsFromUser?: boolean;
    isPromoted?: boolean;
    isBoosted?: boolean;
    freeDeliveryLabel?: string | null;
};
