import { useCallback, useState } from 'react';
import { handleSearch } from '../functions/api/apiRequest';
import type { MainPageProps } from '../types/navigation';

export type SearchErrorType = 'no_connection' | 'api_error' | 'invalid_postcode';

type UseMainPageViewModelOptions = {
    navigation: MainPageProps['navigation'];
    isConnected: boolean | null;
};

export const useMainPageViewModel = ({ navigation, isConnected }: UseMainPageViewModelOptions) => {
    const [postcode, setPostcode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<SearchErrorType | null>(null);

    const dismissError = useCallback(() => {
        setError(null);
    }, []);

    const submit = useCallback(async (text: string): Promise<void> => {
        const cleaned = text.replaceAll(' ', '').toUpperCase();

        if (!isConnected) {
            setError('no_connection');
            return;
        }

        setLoading(true);
        const result = await handleSearch(cleaned);
        setLoading(false);

        if (result.ok) {
            navigation.navigate('DisplayPage', {
                postcode: cleaned,
                restaurants: result.restaurants,
                allRestaurants: result.allRestaurants,
                metaData: result.metaData,
                deliveryFees: result.deliveryFees,
                promotedPlacement: result.promotedPlacement,
                filters: result.filters,
                layout: result.layout,
            });
        } else if (result.reason === 'api_error') {
            setError('api_error');
        } else {
            setError('invalid_postcode');
        }
    }, [isConnected, navigation]);

    return { postcode, setPostcode, loading, error, dismissError, submit };
};
