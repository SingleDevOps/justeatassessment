import React from 'react';
import { render, screen, fireEvent, within, waitForElementToBeRemoved } from '@testing-library/react-native';
import DisplayPage from '../pages/DisplayPage';
import { TextMatch } from '@testing-library/react-native/build/matches';

const mockSetOptions = jest.fn();
const mockNavigation = {
    setOptions: mockSetOptions,
} as any;

const mockRestaurants = [
    {
        id: '101',
        name: 'Pizza Place',
        logoUrl: 'http://example.com/logo1.png',
        rating: { starRating: 4.5, count: 150 },
        cuisines: [{ name: 'Pizza' }, { name: 'Italian' }],
        address: { firstLine: '1 Pizza Street', city: 'Pizzatown' },
    },
    {
        id: '102',
        name: 'Burger Joint',
        logoUrl: 'http://example.com/logo2.png',
        rating: { starRating: 4.0, count: 200 },
        cuisines: [{ name: 'Burgers' }, { name: 'American' }],
        address: { firstLine: '2 Burger Lane', city: 'Burgerville' },
    },
    {
        id: '103',
        name: 'Sushi Spot',
        logoUrl: 'http://example.com/logo3.png',
        rating: { starRating: 4.8, count: 100 },
        cuisines: [{ name: 'Sushi' }, { name: 'Japanese' }],
        address: { firstLine: '3 Sushi Avenue', city: 'Sushicity' },
    },
];

const mockRoute = {
    params: {
        postcode: 'SW1A 0AA',
        restaurants: mockRestaurants,
    },
} as any;

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
    default: jest.fn().mockReturnValue('light'), // or 'dark'
}));

describe('<DisplayPage />', () => {
    beforeEach(() => {
        mockSetOptions.mockClear();
    });

    const selectSortOption = async (optionText: TextMatch) => {
        fireEvent.press(screen.getByLabelText('Filters'));
        const option = await screen.findByText(optionText);
        fireEvent.press(option);
        fireEvent.press(screen.getByText('Apply Filters'));
        await waitForElementToBeRemoved(() => screen.queryByText('Filters'));
    };

    it('renders restaurants initially', () => {
        render(<DisplayPage navigation={mockNavigation} route={mockRoute} />);

        expect(screen.getByText('Pizza Place')).toBeTruthy();
        expect(screen.getByText('Burger Joint')).toBeTruthy();
        expect(screen.getByText('Sushi Spot')).toBeTruthy();
    });

    it('sorts restaurants by Rating (High to Low)', async () => {
        render(<DisplayPage navigation={mockNavigation} route={mockRoute} />);

        await selectSortOption('Rating (High to Low)');

        let allCards = await screen.findAllByTestId(/restaurant-card-/);
        expect(within(allCards[0]).getByText('Sushi Spot')).toBeTruthy(); // 4.8
        expect(within(allCards[1]).getByText('Pizza Place')).toBeTruthy(); // 4.5
        expect(within(allCards[2]).getByText('Burger Joint')).toBeTruthy(); // 4.0
    });

    it('sorts restaurants by Rating (Low to High)', async () => {
        render(<DisplayPage navigation={mockNavigation} route={mockRoute} />);

        await selectSortOption('Rating (Low to High)');

        let allCards = await screen.findAllByTestId(/restaurant-card-/);
        expect(within(allCards[0]).getByText('Burger Joint')).toBeTruthy(); // 4.0
        expect(within(allCards[1]).getByText('Pizza Place')).toBeTruthy();  // 4.5
        expect(within(allCards[2]).getByText('Sushi Spot')).toBeTruthy();   // 4.8
    });

    it('sorts restaurants by Name (A-Z)', async () => {
        render(<DisplayPage navigation={mockNavigation} route={mockRoute} />);

        await selectSortOption('Name (A-Z)');

        let allCards = await screen.findAllByTestId(/restaurant-card-/);
        expect(within(allCards[0]).getByText('Burger Joint')).toBeTruthy();
        expect(within(allCards[1]).getByText('Pizza Place')).toBeTruthy();
        expect(within(allCards[2]).getByText('Sushi Spot')).toBeTruthy();
    });

    it('sorts restaurants by Name (Z-A)', async () => {
        render(<DisplayPage navigation={mockNavigation} route={mockRoute} />);

        await selectSortOption('Name (Z-A)');

        let allCards = await screen.findAllByTestId(/restaurant-card-/);
        expect(within(allCards[0]).getByText('Sushi Spot')).toBeTruthy();
        expect(within(allCards[1]).getByText('Pizza Place')).toBeTruthy();
        expect(within(allCards[2]).getByText('Burger Joint')).toBeTruthy();
    });

    it('sorts restaurants by Rating Count (More to Less)', async () => {
        render(<DisplayPage navigation={mockNavigation} route={mockRoute} />);

        await selectSortOption('Rating Count (More to Less)');

        let allCards = await screen.findAllByTestId(/restaurant-card-/);
        expect(within(allCards[0]).getByText('Burger Joint')).toBeTruthy(); // 200
        expect(within(allCards[1]).getByText('Pizza Place')).toBeTruthy();  // 150
        expect(within(allCards[2]).getByText('Sushi Spot')).toBeTruthy();   // 100
    });

    it('sorts restaurants by Rating Count (Less to More)', async () => {
        render(<DisplayPage navigation={mockNavigation} route={mockRoute} />);

        await selectSortOption('Rating Count (Less to More)');

        let allCards = await screen.findAllByTestId(/restaurant-card-/);
        expect(within(allCards[0]).getByText('Sushi Spot')).toBeTruthy();   // 100
        expect(within(allCards[1]).getByText('Pizza Place')).toBeTruthy();  // 150
        expect(within(allCards[2]).getByText('Burger Joint')).toBeTruthy(); // 200
    });

    it('sorts promoted restaurants first', async () => {
        render(
            <DisplayPage
                navigation={mockNavigation}
                route={{
                    params: {
                        postcode: 'SW1A 0AA',
                        restaurants: mockRestaurants,
                        allRestaurants: mockRestaurants,
                        promotedPlacement: {
                            filteredSearchPromotedLimit: 2,
                            rankedIds: ['102', '101'],
                            restaurants: {
                                '101': { restaurantId: '101', defaultPromoted: true },
                                '102': { restaurantId: '102', defaultPromoted: true },
                            },
                        },
                    },
                } as any}
            />
        );


        await selectSortOption('Promoted first');

        let allCards = await screen.findAllByTestId(/restaurant-card-/);
        expect(within(allCards[0]).getByText('Burger Joint')).toBeTruthy();
        expect(within(allCards[1]).getByText('Pizza Place')).toBeTruthy();
        expect(within(allCards[2]).getByText('Sushi Spot')).toBeTruthy();
    });

    it('shows the promoted badge and area header from enriched data', async () => {
        render(
            <DisplayPage
                navigation={mockNavigation}
                route={{
                    params: {
                        postcode: 'SW1A 0AA',
                        restaurants: mockRestaurants,
                        allRestaurants: mockRestaurants,
                        metaData: { area: 'Anfield', postalCode: 'L4 0TH', district: 'L4' },
                        promotedPlacement: {
                            filteredSearchPromotedLimit: 2,
                            rankedIds: ['101'],
                            restaurants: {
                                '101': { restaurantId: '101', defaultPromoted: true },
                            },
                        },
                        deliveryFees: {
                            restaurants: {
                                '101': {
                                    restaurantId: '101',
                                    minimumOrderValue: 0,
                                    bands: [
                                        { minimumAmount: 0, fee: 300 },
                                        { minimumAmount: 1000, fee: 0 },
                                    ],
                                },
                            },
                        },
                    },
                } as any}
            />
        );


        expect(await screen.findByText('Anfield · L4 0TH')).toBeTruthy();

        const pizzaCard = await screen.findByTestId('restaurant-card-101');
        expect(within(pizzaCard).getByText('Promoted')).toBeTruthy();
        expect(within(pizzaCard).getByText('Free delivery over £10')).toBeTruthy();
    });
});
