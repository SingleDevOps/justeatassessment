import { renderHook, act } from '@testing-library/react-native';
import { useDisplayPageViewModel } from '../viewmodels/useDisplayPageViewModel';
import { handleSearch } from '../functions/api/apiRequest';
import { DEFAULT_FILTER_STATE } from '../configs/filterDefaults';

jest.mock('../functions/api/apiRequest', () => ({
    handleSearch: jest.fn(),
}));

const mockedHandleSearch = handleSearch as jest.MockedFunction<typeof handleSearch>;

const mockRestaurants = [
    {
        id: '101',
        name: 'Pizza Place',
        logoUrl: 'http://example.com/logo1.png',
        rating: { starRating: 4.5, count: 150 },
        cuisines: [{ name: 'Pizza', uniqueName: 'pizza' }, { name: 'Italian', uniqueName: 'italian' }],
        address: { firstLine: '1 Pizza Street', city: 'Pizzatown', postalCode: 'SW1A 0AA' },
        deliveryCost: 2,
        isDelivery: true,
    },
    {
        id: '102',
        name: 'Burger Joint',
        logoUrl: 'http://example.com/logo2.png',
        rating: { starRating: 4.0, count: 200 },
        cuisines: [{ name: 'Burgers', uniqueName: 'burgers' }, { name: 'American', uniqueName: 'american' }],
        address: { firstLine: '2 Burger Lane', city: 'Burgerville', postalCode: 'SW1A 0AA' },
        deliveryCost: 4,
        isDelivery: false,
    },
    {
        id: '103',
        name: 'Sushi Spot',
        logoUrl: 'http://example.com/logo3.png',
        rating: { starRating: 4.8, count: 100 },
        cuisines: [{ name: 'Sushi', uniqueName: 'sushi' }, { name: 'Japanese', uniqueName: 'japanese' }],
        address: { firstLine: '3 Sushi Avenue', city: 'Sushicity', postalCode: 'SW1A 0AA' },
        deliveryCost: 5,
        isDelivery: true,
    },
] as any;

const createRoute = (overrides: any = {}): any => ({
    params: {
        postcode: 'SW1A0AA',
        restaurants: mockRestaurants,
        allRestaurants: mockRestaurants,
        ...overrides,
    },
});

describe('useDisplayPageViewModel', () => {
    beforeEach(() => {
        mockedHandleSearch.mockClear();
    });

    it('initializes state from route params', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        expect(result.current.postcode).toBe('SW1A0AA');
        expect(result.current.sortedRestaurants).toHaveLength(3);
        expect(result.current.allRestaurants).toHaveLength(3);
        expect(result.current.matchCount).toBe(3);
        expect(result.current.activeFilterCount).toBe(0);
    });

    it('defaults postcode to L40TH when missing', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: { params: {} } as any }));

        expect(result.current.postcode).toBe('L40TH');
        expect(result.current.sortedRestaurants).toEqual([]);
    });

    it('sorts restaurants by rating high to low', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        act(() => {
            result.current.setSelectedSortOption('Rating (High to Low)');
        });

        expect(result.current.sortedRestaurants.map(r => r.id)).toEqual(['103', '101', '102']);
    });

    it('sorts restaurants by rating low to high', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        act(() => {
            result.current.setSelectedSortOption('Rating (Low to High)');
        });

        expect(result.current.sortedRestaurants.map(r => r.id)).toEqual(['102', '101', '103']);
    });

    it('sorts restaurants by name A-Z', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        act(() => {
            result.current.setSelectedSortOption('Name (A-Z)');
        });

        expect(result.current.sortedRestaurants.map(r => r.id)).toEqual(['102', '101', '103']);
    });

    it('sorts restaurants by rating count more to less', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        act(() => {
            result.current.setSelectedSortOption('Rating Count (More to Less)');
        });

        expect(result.current.sortedRestaurants.map(r => r.id)).toEqual(['102', '101', '103']);
    });

    it('filters restaurants by search query', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        act(() => {
            result.current.setSearchQuery('pizza');
        });

        expect(result.current.matchCount).toBe(1);
        expect(result.current.filteredRestaurants.map(r => r.id)).toEqual(['101']);
    });

    it('filters restaurants by minimum rating', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        act(() => {
            result.current.setFilters({ ...DEFAULT_FILTER_STATE, minRating: 4.5 });
        });

        expect(result.current.filteredRestaurants.map(r => r.id)).toEqual(['101', '103']);
        expect(result.current.activeFilterCount).toBe(1);
        expect(result.current.matchCount).toBe(2);
    });

    it('filters restaurants by delivery availability', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        act(() => {
            result.current.setFilters({ ...DEFAULT_FILTER_STATE, delivery: true });
        });

        expect(result.current.filteredRestaurants.map(r => r.id)).toEqual(['101', '103']);
    });

    it('filters restaurants by selected cuisines', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        act(() => {
            result.current.setFilters({ ...DEFAULT_FILTER_STATE, selectedCuisines: ['burgers'] });
        });

        expect(result.current.filteredRestaurants.map(r => r.id)).toEqual(['102']);
    });

    it('limits search results to SEARCH_RESULT_LIMIT entries', () => {
        const manyRestaurants = Array.from({ length: 15 }, (_, i) => ({
            ...mockRestaurants[0],
            id: String(1000 + i),
            name: `Restaurant ${i}`,
            rating: { starRating: 4 + (i % 5) * 0.1, count: i },
            cuisines: [{ name: 'Pizza', uniqueName: 'pizza' }],
            address: { firstLine: `Street ${i}`, city: 'Town', postalCode: 'SW1A 0AA' },
        }));
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute({ restaurants: manyRestaurants, allRestaurants: manyRestaurants }) }));

        act(() => {
            result.current.setSearchQuery('restaurant');
        });

        expect(result.current.filteredRestaurants.length).toBeLessThanOrEqual(10);
        expect(result.current.matchCount).toBe(15);
    });

    it('refreshes restaurant data and resets the sort option', async () => {
        const refreshed = [{ ...mockRestaurants[0], id: '999', name: 'Fresh Place' }];
        mockedHandleSearch.mockResolvedValue({
            ok: true,
            restaurants: refreshed,
            allRestaurants: refreshed,
        } as any);

        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        act(() => {
            result.current.setSelectedSortOption('Name (A-Z)');
        });
        expect(result.current.selectedSortOption).toBe('Name (A-Z)');

        await act(async () => {
            await result.current.onRefresh();
        });

        expect(mockedHandleSearch).toHaveBeenCalledWith('SW1A0AA');
        expect(result.current.refreshing).toBe(false);
        expect(result.current.sortedRestaurants.map(r => r.id)).toEqual(['999']);
        expect(result.current.selectedSortOption).toBe('');
    });

    it('keeps the previous list when refresh fails', async () => {
        mockedHandleSearch.mockResolvedValue({ ok: false, reason: 'api_error' } as any);

        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        await act(async () => {
            await result.current.onRefresh();
        });

        expect(result.current.sortedRestaurants).toHaveLength(3);
        expect(result.current.refreshing).toBe(false);
    });

    it('toggles the filter modal visibility', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: createRoute() }));

        expect(result.current.filterModalVisible).toBe(false);
        act(() => {
            result.current.toggleFilterModal(true);
        });
        expect(result.current.filterModalVisible).toBe(true);
    });
});

const enrichedRoute = (overrides: any = {}): any => ({
    params: {
        postcode: 'SW1A0AA',
        restaurants: mockRestaurants,
        allRestaurants: mockRestaurants,
        metaData: { area: 'Anfield', postalCode: 'L4 0TH', district: 'L4' },
        promotedPlacement: {
            filteredSearchPromotedLimit: 2,
            rankedIds: ['102', '103'],
            restaurants: {
                '102': { restaurantId: '102', defaultPromoted: true },
                '103': { restaurantId: '103', defaultPromoted: true },
            },
        },
        filters: {
            'free_delivery': {
                displayName: 'Free Delivery',
                restaurantIds: ['101', '102'],
            },
            'open_now': {
                displayName: 'Open Now',
                restaurantIds: ['102'],
            },
            'local-legends': {
                displayName: 'Local Legends',
                restaurantIds: ['103'],
            },
        },
        layout: {
            'search-refine-filters': {
                type: 'list',
                id: 'search-refine-filters',
                title: 'Filters',
                contents: [
                    { type: 'filter', id: 'free_delivery', title: 'Free Delivery' },
                    { type: 'filter', id: 'open_now', title: 'Open Now' },
                ],
            },
        },
        ...overrides,
    },
});

describe('useDisplayPageViewModel enriched data', () => {
    it('exposes meta data for the area header', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: enrichedRoute() }));

        expect(result.current.metaData?.area).toBe('Anfield');
        expect(result.current.metaData?.postalCode).toBe('L4 0TH');
    });

    it('identifies promoted restaurants from promotedPlacement', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: enrichedRoute() }));

        expect(result.current.isPromoted('102')).toBe(true);
        expect(result.current.isPromoted('101')).toBe(false);
    });

    it('sorts promoted restaurants first when the promoted sort is selected', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: enrichedRoute() }));

        act(() => {
            result.current.setSelectedSortOption('Promoted first');
        });

        expect(result.current.sortedRestaurants.map(r => r.id)).toEqual(['102', '101']);
    });

    it('builds layout filter definitions with counts', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: enrichedRoute() }));

        expect(result.current.layoutFilterDefs).toEqual([
            { id: 'free_delivery', title: 'Free Delivery', count: 2 },
            { id: 'open_now', title: 'Open Now', count: 1 },
        ]);
    });

    it('filters the list by a selected layout chip', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: enrichedRoute() }));

        act(() => {
            result.current.toggleLayoutFilter('free_delivery');
        });

        expect(result.current.filteredRestaurants.map(r => r.id)).toEqual(['101', '102']);
        expect(result.current.activeFilterCount).toBe(1);
        expect(result.current.matchCount).toBe(2);
    });

    it('toggles a layout chip off again', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: enrichedRoute() }));

        act(() => {
            result.current.toggleLayoutFilter('open_now');
            result.current.toggleLayoutFilter('open_now');
        });

        expect(result.current.layoutFilters).toEqual([]);
        expect(result.current.activeFilterCount).toBe(0);
    });

    it('builds the local legends list from filter restaurant ids', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: enrichedRoute() }));

        expect(result.current.localLegendsRestaurants.map(r => r.id)).toEqual(['103']);
    });

    it('excludes local legends from the main list', () => {
        const { result } = renderHook(() => useDisplayPageViewModel({ route: enrichedRoute() }));

        expect(result.current.sortedRestaurants.map(r => r.id)).toEqual(['101', '102']);
    });
});
