import React from 'react';
import { render } from '@testing-library/react-native';
import { RestaurantCard } from '../components/RestaurantCard';
import { pieTokens } from '../configs/pieTokens';
import type { RestaurantType } from '../types/restaurant';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
    default: jest.fn().mockReturnValue('light'),
}));

const restaurant: RestaurantType = {
    id: '123',
    logoUrl: 'https://example.com/logo.png',
    name: 'Testaurant',
    cuisines: [{ name: 'Pizza' }],
    rating: { starRating: 4.5, count: 100, userRating: null },
    address: { firstLine: '1 Test Street', city: 'Liverpool', postalCode: 'L4 0TH' },
    isNew: true,
    isOpenNowForDelivery: true,
};

const navigation = { navigate: jest.fn() } as never;

describe('<RestaurantCard /> accessibility', () => {
    it('exposes the card as a button with the restaurant name and rating', () => {
        const { getByRole } = render(
            <RestaurantCard
                item={restaurant}
                theme={pieTokens.light}
                cuisines="🍕 Pizza"
                navigation={navigation}
            />
        );

        const card = getByRole('button', { name: 'Testaurant, rating 4.5 out of 5' });
        expect(card).toBeTruthy();
    });

    it('renders the restaurant details for sighted users', () => {
        const { getByTestId, getByText } = render(
            <RestaurantCard
                item={restaurant}
                theme={pieTokens.light}
                cuisines="🍕 Pizza"
                navigation={navigation}
            />
        );

        expect(getByTestId('restaurant-name')).toHaveTextContent('Testaurant');
        expect(getByTestId('restaurant-rating')).toHaveTextContent('4.5');
        expect(getByTestId('restaurant-cuisine')).toHaveTextContent('🍕 Pizza');
        expect(getByText('Open now')).toBeTruthy();
    });
});
