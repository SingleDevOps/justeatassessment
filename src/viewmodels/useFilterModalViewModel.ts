import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_FILTER_STATE, DEFAULT_SORT_OPTION } from '../configs/filterDefaults';
import type { FilterState } from '../types/filterOptions';

type BooleanFilterKey = 'openNow' | 'delivery' | 'collection' | 'hasDeals';

type UseFilterModalViewModelOptions = {
    visible: boolean;
    currentFilters: FilterState;
    currentSortOption: string;
    onApply: (filters: FilterState, sortOption: string) => void;
    onClose: () => void;
};

export const useFilterModalViewModel = ({ visible, currentFilters, currentSortOption, onApply, onClose }: UseFilterModalViewModelOptions) => {
    const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);
    const [localSortOption, setLocalSortOption] = useState(currentSortOption);

    useEffect(() => {
        if (visible) {
            setLocalFilters(currentFilters);
            setLocalSortOption(currentSortOption);
        }
    }, [visible, currentFilters, currentSortOption]);

    const hasActiveFilters = JSON.stringify(localFilters) !== JSON.stringify(DEFAULT_FILTER_STATE) ||
        localSortOption !== DEFAULT_SORT_OPTION;

    const toggleBoolean = useCallback((key: BooleanFilterKey) => {
        setLocalFilters(prev => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const setMinRating = useCallback((value: number) => {
        setLocalFilters(prev => ({ ...prev, minRating: prev.minRating === value ? 0 : value }));
    }, []);

    const setMaxDeliveryCost = useCallback((value: number | null) => {
        setLocalFilters(prev => ({ ...prev, maxDeliveryCost: prev.maxDeliveryCost === value ? null : value }));
    }, []);

    const toggleCuisine = useCallback((uniqueName: string) => {
        setLocalFilters(prev => {
            const exists = prev.selectedCuisines.includes(uniqueName);
            return {
                ...prev,
                selectedCuisines: exists
                    ? prev.selectedCuisines.filter(c => c !== uniqueName)
                    : [...prev.selectedCuisines, uniqueName],
            };
        });
    }, []);

    const setSortOption = useCallback((value: string) => {
        setLocalSortOption(prev => (prev === value ? DEFAULT_SORT_OPTION : value));
    }, []);

    const reset = useCallback(() => {
        setLocalFilters({ ...DEFAULT_FILTER_STATE });
        setLocalSortOption(DEFAULT_SORT_OPTION);
    }, []);

    const commit = useCallback(() => {
        onApply(localFilters, localSortOption);
        onClose();
    }, [localFilters, localSortOption, onApply, onClose]);

    return {
        localFilters,
        localSortOption,
        hasActiveFilters,
        toggleBoolean,
        setMinRating,
        setMaxDeliveryCost,
        toggleCuisine,
        setSortOption,
        reset,
        commit,
    };
};
