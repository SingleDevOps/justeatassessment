import { useCallback, useMemo, useState } from 'react';
import { handleSearch } from '../functions/api/apiRequest';
import { applyFilters, applyRestaurantIdFilter, countActiveFilters } from '../functions/filtering/applyFilters';
import { filterRestaurants, shuffleArray, SEARCH_RESULT_LIMIT } from '../functions/filtering/searchRestaurants';
import { getLayoutFilterDefs, getRestaurantIdsForLayoutFilters } from '../functions/filtering/layoutFilters';
import { sortResData } from '../functions/sorting/sortRestaurantData';
import { sortByPromotedPlacement } from '../functions/sorting/sortByPromotedPlacement';
import { SortOptionValue, SortOrder } from '../configs/sortingOptions';
import { DEFAULT_FILTER_STATE, DEFAULT_LAYOUT_FILTERS } from '../configs/filterDefaults';
import type { DisplayPageProps } from '../types/navigation';
import type { RestaurantType } from '../types/restaurant';
import type { FilterState } from '../types/filterOptions';
import type { DeliveryFeesType, MetaDataType, PromotedPlacementType, FilterDefType } from '../types/searchData';

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
    const {
        restaurants: routeRestaurants,
        allRestaurants: routeAllRestaurants,
        postcode: routePostcode,
        metaData: routeMetaData,
        deliveryFees: routeDeliveryFees,
        promotedPlacement: routePromotedPlacement,
        filters: routeFilters,
        layout: routeLayout,
    } = route.params ?? {};
    const postcode = routePostcode || 'L40TH';

    const [allRestaurants, setAllRestaurants] = useState<RestaurantType[]>(routeAllRestaurants ?? []);
    const [displayRestaurants, setDisplayRestaurants] = useState<RestaurantType[]>(routeRestaurants ?? []);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTER_STATE });
    const [layoutFilters, setLayoutFilters] = useState<string[]>([]);
    const [metaData, setMetaData] = useState<MetaDataType | undefined>(routeMetaData);
    const [deliveryFees, setDeliveryFees] = useState<DeliveryFeesType | undefined>(routeDeliveryFees);
    const [promotedPlacement, setPromotedPlacement] = useState<PromotedPlacementType | undefined>(routePromotedPlacement);
    const [filterDefs, setFilterDefs] = useState<Record<string, FilterDefType> | undefined>(routeFilters);

    const activeFilterCount = useMemo(
        () => countActiveFilters(filters) + layoutFilters.length,
        [filters, layoutFilters]
    );

    const isPromoted = useCallback(
        (restaurantId: string | number): boolean => {
            const entry = promotedPlacement?.restaurants?.[restaurantId.toString()];
            return entry?.defaultPromoted === true;
        },
        [promotedPlacement]
    );

    const layoutFilterDefs = useMemo(
        () => getLayoutFilterDefs(routeLayout, filterDefs, DEFAULT_LAYOUT_FILTERS),
        [routeLayout, filterDefs]
    );

    const layoutRestaurantIds = useMemo(
        () => getRestaurantIdsForLayoutFilters(filterDefs, layoutFilters),
        [filterDefs, layoutFilters]
    );

    const localLegendsIds = useMemo(() => {
        const ids = filterDefs?.['local-legends']?.restaurantIds ?? [];
        return new Set(ids);
    }, [filterDefs]);

    const localLegendsRestaurants = useMemo(() => {
        const ids = filterDefs?.['local-legends']?.restaurantIds ?? [];
        if (ids.length === 0) {
            return [];
        }
        const byId = new Map(allRestaurants.map(r => [r.id.toString(), r]));
        return ids.map(id => byId.get(id)).filter((r): r is RestaurantType => r !== undefined);
    }, [filterDefs, allRestaurants]);

    const listBase = useMemo(() => {
        if (searchQuery.trim() || localLegendsRestaurants.length === 0) {
            return displayRestaurants;
        }
        return displayRestaurants.filter(r => !localLegendsIds.has(r.id.toString()));
    }, [displayRestaurants, searchQuery, localLegendsRestaurants, localLegendsIds]);

    const sortedRestaurants = useMemo(() => {
        if (selectedSortOption === SortOptionValue.PROMOTED_FIRST) {
            return sortByPromotedPlacement(listBase, promotedPlacement);
        }
        const order = mapSortOptionToOrder(selectedSortOption);
        if (!order) {
            return listBase;
        }
        return sortResData(listBase, order);
    }, [listBase, selectedSortOption, promotedPlacement]);

    const filteredRestaurants = useMemo(() => {
        let base: RestaurantType[];

        if (searchQuery.trim()) {
            base = filterRestaurants(allRestaurants, searchQuery);
        } else {
            base = sortedRestaurants;
        }

        const filtered = applyRestaurantIdFilter(applyFilters(base, filters), layoutRestaurantIds);

        if (searchQuery.trim()) {
            return shuffleArray(filtered).slice(0, SEARCH_RESULT_LIMIT);
        }

        return filtered;
    }, [sortedRestaurants, allRestaurants, searchQuery, filters, layoutRestaurantIds]);

    const matchCount = useMemo(() => {
        let base: RestaurantType[];

        if (searchQuery.trim()) {
            base = filterRestaurants(allRestaurants, searchQuery);
        } else {
            base = allRestaurants;
        }

        return applyRestaurantIdFilter(applyFilters(base, filters), layoutRestaurantIds).length;
    }, [allRestaurants, searchQuery, filters, layoutRestaurantIds]);

    const toggleLayoutFilter = useCallback((id: string) => {
        setLayoutFilters(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const result = await handleSearch(postcode);
        if (result.ok) {
            setSelectedSortOption('');
            setDisplayRestaurants(result.restaurants);
            setAllRestaurants(result.allRestaurants);
            if (result.metaData) {
                setMetaData(result.metaData);
            }
            if (result.deliveryFees) {
                setDeliveryFees(result.deliveryFees);
            }
            if (result.promotedPlacement) {
                setPromotedPlacement(result.promotedPlacement);
            }
            if (result.filters) {
                setFilterDefs(result.filters);
            }
        }
        setRefreshing(false);
    }, [postcode]);

    const toggleFilterModal = useCallback((visible: boolean) => {
        setFilterModalVisible(visible);
    }, []);

    return {
        postcode,
        metaData,
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
        layoutFilters,
        toggleLayoutFilter,
        layoutFilterDefs,
        deliveryFees,
        isPromoted,
        localLegendsRestaurants,
        onRefresh,
    };
};
