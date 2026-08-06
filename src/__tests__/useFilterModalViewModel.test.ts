import { renderHook, act } from '@testing-library/react-native';
import { useFilterModalViewModel } from '../viewmodels/useFilterModalViewModel';
import { DEFAULT_FILTER_STATE, DEFAULT_SORT_OPTION } from '../configs/filterDefaults';
import type { FilterState } from '../types/filterOptions';

const createProps = (overrides: Partial<FilterState> = {}, sortOption: string = DEFAULT_SORT_OPTION) => ({
    visible: true,
    currentFilters: { ...DEFAULT_FILTER_STATE, ...overrides },
    currentSortOption: sortOption,
    onApply: jest.fn(),
    onClose: jest.fn(),
});

describe('useFilterModalViewModel', () => {
    it('initializes the draft from current filters', () => {
        const props = createProps({ minRating: 4 });
        const { result } = renderHook(() => useFilterModalViewModel(props));

        expect(result.current.localFilters.minRating).toBe(4);
    });

    it('syncs the draft when the modal becomes visible', () => {
        const props = createProps({ minRating: 3 });
        const { result, rerender } = renderHook((p: any) => useFilterModalViewModel(p), { initialProps: { ...props, visible: false } });

        act(() => {
            result.current.setMinRating(4.5);
        });
        expect(result.current.localFilters.minRating).toBe(4.5);

        rerender({ ...props, visible: true });
        expect(result.current.localFilters.minRating).toBe(3);
    });

    it('toggles boolean filters', () => {
        const props = createProps();
        const { result } = renderHook(() => useFilterModalViewModel(props));

        act(() => {
            result.current.toggleBoolean('delivery');
        });
        expect(result.current.localFilters.delivery).toBe(true);

        act(() => {
            result.current.toggleBoolean('delivery');
        });
        expect(result.current.localFilters.delivery).toBe(false);
    });

    it('toggles the minimum rating between the value and zero', () => {
        const props = createProps();
        const { result } = renderHook(() => useFilterModalViewModel(props));

        act(() => {
            result.current.setMinRating(4);
        });
        expect(result.current.localFilters.minRating).toBe(4);

        act(() => {
            result.current.setMinRating(4);
        });
        expect(result.current.localFilters.minRating).toBe(0);
    });

    it('toggles the max delivery cost between the value and the default', () => {
        const props = createProps();
        const { result } = renderHook(() => useFilterModalViewModel(props));

        act(() => {
            result.current.setMaxDeliveryCost(2);
        });
        expect(result.current.localFilters.maxDeliveryCost).toBe(2);

        act(() => {
            result.current.setMaxDeliveryCost(2);
        });
        expect(result.current.localFilters.maxDeliveryCost).toBe(10);
    });

    it('adds and removes selected cuisines', () => {
        const props = createProps();
        const { result } = renderHook(() => useFilterModalViewModel(props));

        act(() => {
            result.current.toggleCuisine('pizza');
        });
        expect(result.current.localFilters.selectedCuisines).toEqual(['pizza']);

        act(() => {
            result.current.toggleCuisine('pizza');
        });
        expect(result.current.localFilters.selectedCuisines).toEqual([]);
    });

    it('initializes the sort option from currentSortOption', () => {
        const props = createProps({}, 'Rating (High to Low)');
        const { result } = renderHook(() => useFilterModalViewModel(props));

        expect(result.current.localSortOption).toBe('Rating (High to Low)');
    });

    it('syncs the sort option when the modal becomes visible', () => {
        const props = createProps({}, 'Rating (High to Low)');
        const { result, rerender } = renderHook((p: any) => useFilterModalViewModel(p), { initialProps: { ...props, visible: false } });

        act(() => {
            result.current.setSortOption('Name (A-Z)');
        });
        expect(result.current.localSortOption).toBe('Name (A-Z)');

        rerender({ ...props, visible: true });
        expect(result.current.localSortOption).toBe('Rating (High to Low)');
    });

    it('selects and deselects a sort option', () => {
        const props = createProps();
        const { result } = renderHook(() => useFilterModalViewModel(props));

        act(() => {
            result.current.setSortOption('Name (A-Z)');
        });
        expect(result.current.localSortOption).toBe('Name (A-Z)');

        act(() => {
            result.current.setSortOption('Name (A-Z)');
        });
        expect(result.current.localSortOption).toBe(DEFAULT_SORT_OPTION);
    });

    it('reports hasChanges based on the default state', () => {
        const props = createProps();
        const { result } = renderHook(() => useFilterModalViewModel(props));

        expect(result.current.hasChanges).toBe(false);

        act(() => {
            result.current.toggleBoolean('hasDeals');
        });
        expect(result.current.hasChanges).toBe(true);
    });

    it('reports hasChanges when a sort option is selected', () => {
        const props = createProps();
        const { result } = renderHook(() => useFilterModalViewModel(props));

        expect(result.current.hasChanges).toBe(false);

        act(() => {
            result.current.setSortOption('Name (A-Z)');
        });
        expect(result.current.hasChanges).toBe(true);
    });

    it('reset restores the default filter state and sort option', () => {
        const props = createProps({ minRating: 4, selectedCuisines: ['pizza'] }, 'Name (A-Z)');
        const { result } = renderHook(() => useFilterModalViewModel(props));

        act(() => {
            result.current.reset();
        });

        expect(result.current.localFilters).toEqual(DEFAULT_FILTER_STATE);
        expect(result.current.localSortOption).toBe(DEFAULT_SORT_OPTION);
        expect(result.current.hasChanges).toBe(false);
    });

    it('commit applies the draft filters and sort option, then closes', () => {
        const onApply = jest.fn();
        const onClose = jest.fn();
        const { result } = renderHook(() =>
            useFilterModalViewModel({ visible: true, currentFilters: DEFAULT_FILTER_STATE, currentSortOption: DEFAULT_SORT_OPTION, onApply, onClose })
        );

        act(() => {
            result.current.toggleBoolean('openNow');
        });
        act(() => {
            result.current.setSortOption('Rating (High to Low)');
        });

        act(() => {
            result.current.commit();
        });

        expect(onApply).toHaveBeenCalledTimes(1);
        expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ openNow: true }), 'Rating (High to Low)');
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
