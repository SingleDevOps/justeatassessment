import { useCallback, useEffect, useMemo, useState } from 'react';
import { handleSearch } from '../functions/api/apiRequest';
import { applyFilters, countActiveFilters } from '../functions/filtering/applyFilters';
import { filterRestaurants, shuffleArray, SEARCH_RESULT_LIMIT } from '../functions/filtering/searchRestaurants';
import { sortResData } from '../functions/sorting/sortRestaurantData';
import { SortOptionValue, SortOrder } from '../configs/sortingOptions';
import { DEFAULT_FILTER_STATE } from '../configs/filterDefaults';
import type { DisplayPageProps } from '../types/navigation';
import type { RestaurantType } from '../types/restaurant';
import type { FilterState } from '../types/filterOptions';

type UseDisplayPageViewModelOptions = {
    route: DisplayPageProps['route'];
};

function mapSortOptionToOrder(option: string): SortOrder | null {
    switch (option) {
        case SortOptionValue.RATING_HIGH_LOW:
            return SortOrder.DESC;
        case SortOptionValue.RATING_LOW_HIGH:
            return SortOrder.ASC;
        case SortOptionValue.COUNT_MORE_LESS:
            return SortOrder.MORE_TO_LESS_COUNT;
        case SortOptionValue.COUNT_LESS_MORE:
            return SortOrder.LESS_TO_MORE_COUNT;
        case SortOptionValue.NAME_A_Z:
            return SortOrder.A_Z;
        case SortOptionValue.NAME_Z_A:
            return SortOrder.Z_A;
        default:
            return null;
    }
}

export const useDisplayPageViewModel = ({ route }: UseDisplayPageViewModelOptions) => {
    const { restaurants: routeRestaurants, allRestaurants: routeAllRestaurants, postcode: routePostcode } = route.params ?? {};
    const postcode = routePostcode || 'L40TH';

    const [allRestaurants, setAllRestaurants] = useState<RestaurantType[]>(routeAllRestaurants ?? []);
    const [displayRestaurants, setDisplayRestaurants] = useState<RestaurantType[]>(routeRestaurants ?? []);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [shuffleKey, setShuffleKey] = useState(0);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTER_STATE });

    useEffect(() => {
        return () => {
            setFilters({ ...DEFAULT_FILTER_STATE });
        };
    }, []);

    const activeFilterCount = useMemo(() => countActiveFilters(filters), [filters]);

    const sortedRestaurants = useMemo(() => {
        const order = mapSortOptionToOrder(selectedSortOption);
        if (!order) {
            return displayRestaurants;
        }
        return sortResData(displayRestaurants, order);
    }, [displayRestaurants, selectedSortOption]);

    const filteredRestaurants = useMemo(() => {
        let base: RestaurantType[];

        if (searchQuery.trim()) {
            base = filterRestaurants(allRestaurants, searchQuery);
        } else {
            base = sortedRestaurants;
        }

        const filtered = applyFilters(base, filters);

        if (searchQuery.trim()) {
            return shuffleArray(filtered).slice(0, SEARCH_RESULT_LIMIT);
        }

        return filtered;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortedRestaurants, allRestaurants, searchQuery, shuffleKey, filters]);

    const matchCount = useMemo(() => {
        let base: RestaurantType[];

        if (searchQuery.trim()) {
            base = filterRestaurants(allRestaurants, searchQuery);
        } else {
            base = allRestaurants;
        }

        return applyFilters(base, filters).length;
    }, [allRestaurants, searchQuery, filters]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const result = await handleSearch(postcode);
        if (result.ok) {
            setSelectedSortOption('');
            setDisplayRestaurants(result.restaurants);
            setAllRestaurants(result.allRestaurants);
            setShuffleKey(prev => prev + 1);
        }
        setRefreshing(false);
    }, [postcode]);

    const toggleFilterModal = useCallback((visible: boolean) => {
        setFilterModalVisible(visible);
    }, []);

    return {
        postcode,
        allRestaurants,
        sortedRestaurants,
        filteredRestaurants,
        matchCount,
        activeFilterCount,
        refreshing,
        searchQuery,
        setSearchQuery,
        selectedSortOption,
        setSelectedSortOption,
        filterModalVisible,
        toggleFilterModal,
        filters,
        setFilters,
        onRefresh,
    };
};
