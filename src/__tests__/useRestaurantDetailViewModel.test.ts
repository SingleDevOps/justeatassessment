import { renderHook, act } from '@testing-library/react-native';
import { useRestaurantDetailViewModel, formatDate, formatEta, DEALS_INITIAL_LIMIT } from '../viewmodels/useRestaurantDetailViewModel';

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
