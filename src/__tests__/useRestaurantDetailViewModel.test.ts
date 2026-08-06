import { renderHook, act } from '@testing-library/react-native';
import { useRestaurantDetailViewModel, formatDate, formatEta, getDealOfferTypeLabel, DEALS_INITIAL_LIMIT } from '../viewmodels/useRestaurantDetailViewModel';

describe('useRestaurantDetailViewModel', () => {
    it('deduplicates deals by offerType and description', () => {
        const restaurant = {
            deals: [
                { offerType: 'Voucher', description: 'Free chips' },
                { offerType: 'Voucher', description: 'Free chips' },
                { offerType: 'FreeItem', description: 'Free drink' },
            ],
        } as any;

        const { result } = renderHook(() => useRestaurantDetailViewModel(restaurant));

        expect(result.current.uniqueDeals).toHaveLength(2);
    });

    it('removes StampCard deals without a description', () => {
        const restaurant = {
            deals: [
                { offerType: 'StampCard', description: '' },
                { offerType: 'StampCard', description: 'Buy 9 get 1 free' },
            ],
        } as any;

        const { result } = renderHook(() => useRestaurantDetailViewModel(restaurant));

        expect(result.current.uniqueDeals).toHaveLength(1);
        expect(result.current.uniqueDeals[0].description).toBe('Buy 9 get 1 free');
    });

    it('treats missing deals as an empty list', () => {
        const { result } = renderHook(() => useRestaurantDetailViewModel({} as any));

        expect(result.current.uniqueDeals).toEqual([]);
        expect(result.current.dealsExpanded).toBe(false);
    });

    it('toggles deals expansion', () => {
        const restaurant = {
            deals: Array.from({ length: 8 }, (_, i) => ({ offerType: 'Voucher', description: `Deal ${i}` })),
        } as any;

        const { result } = renderHook(() => useRestaurantDetailViewModel(restaurant));

        expect(result.current.uniqueDeals).toHaveLength(8);
        expect(result.current.dealsExpanded).toBe(false);

        act(() => {
            result.current.toggleDealsExpanded();
        });
        expect(result.current.dealsExpanded).toBe(true);

        act(() => {
            result.current.toggleDealsExpanded();
        });
        expect(result.current.dealsExpanded).toBe(false);
    });
});

describe('detail formatters', () => {
    it('formats a date string in en-GB format', () => {
        const result = formatDate('2026-08-06T12:30:00');
        expect(result).toMatch(/Thu|Aug/);
        expect(result).not.toBe('N/A');
    });

    it('returns N/A for missing dates', () => {
        expect(formatDate(undefined)).toBe('N/A');
        expect(formatDate('')).toBe('N/A');
    });

    it('formats approximate eta', () => {
        expect(formatEta({ approximate: 25 })).toBe('~25 min');
    });

    it('formats range eta', () => {
        expect(formatEta({ rangeLower: 20, rangeUpper: 30 })).toBe('20-30 min');
    });

    it('returns N/A for missing or empty eta', () => {
        expect(formatEta(undefined)).toBe('N/A');
        expect(formatEta({})).toBe('N/A');
    });

    it('exposes the initial deals limit', () => {
        expect(DEALS_INITIAL_LIMIT).toBe(5);
    });
});

describe('getDealOfferTypeLabel', () => {
    it('maps known offer types to friendly labels', () => {
        expect(getDealOfferTypeLabel('ItemLevelDiscount')).toBe('Item discount');
        expect(getDealOfferTypeLabel('FreeItem')).toBe('Free item');
        expect(getDealOfferTypeLabel('Voucher')).toBe('Voucher');
        expect(getDealOfferTypeLabel('StampCard')).toBe('Collect stamps');
        expect(getDealOfferTypeLabel('Notification')).toBe('Offer');
    });

    it('falls back to the raw type or Offer', () => {
        expect(getDealOfferTypeLabel('CustomType')).toBe('CustomType');
        expect(getDealOfferTypeLabel(undefined)).toBe('Offer');
    });
});

describe('useRestaurantDetailViewModel with delivery fees', () => {
    const deliveryFees = {
        restaurantId: '213648',
        minimumOrderValue: 0,
        bands: [
            { minimumAmount: 0, fee: 300 },
            { minimumAmount: 1000, fee: 0 },
        ],
    };

    it('exposes the user rating when present', () => {
        const { result } = renderHook(() =>
            useRestaurantDetailViewModel({ rating: { userRating: 4.5 } } as any)
        );
        expect(result.current.userRating).toBe(4.5);
    });

    it('exposes no user rating when absent or null', () => {
        const { result } = renderHook(() =>
            useRestaurantDetailViewModel({ rating: { userRating: null } } as any)
        );
        expect(result.current.userRating).toBeNull();
    });

    it('derives fee bands and free delivery label from delivery fees', () => {
        const { result } = renderHook(() =>
            useRestaurantDetailViewModel({} as any, deliveryFees as any)
        );
        expect(result.current.feeBands).toHaveLength(2);
        expect(result.current.freeDeliveryLabel).toBe('Free delivery over £10.00');
        expect(result.current.minimumOrderValue).toBe(0);
    });

    it('handles missing delivery fees', () => {
        const { result } = renderHook(() => useRestaurantDetailViewModel({} as any));
        expect(result.current.feeBands).toEqual([]);
        expect(result.current.freeDeliveryLabel).toBeNull();
        expect(result.current.minimumOrderValue).toBeNull();
    });
});
