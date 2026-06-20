import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useColorScheme, View, Text, FlatList, RefreshControl } from 'react-native';
import { displayPageStyles } from '../stylesheets/pages/displayPage';
import { filterCuisines } from '../functions/filtering/filter';
import { filterRestaurants, shuffleArray, SEARCH_RESULT_LIMIT } from '../functions/filtering/searchRestaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { SelectListComponent } from '../components/SelectList';
import { FilterSearchBar } from '../components/FilterSearchBar';
import { FilterModal } from '../components/FilterModal';
import { useRestaurantSorting } from '../hooks/useRestaurantSorting';
import { handleSearch } from '../functions/api/apiRequest';
import { DEFAULT_FILTER_STATE } from '../configs/filterDefaults';
import type { DisplayPageProps } from '../types/navigation';
import type { RestaurantType } from '../types/restaurant';
import type { FilterState } from '../types/filterOptions';

const DisplayPage = ({ navigation, route }: DisplayPageProps) => {
    const { restaurants: routeRestaurants, allRestaurants: routeAllRestaurants, postcode: routePostcode } = route.params ?? {};
    const postcode = routePostcode || 'L40TH';
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const {sortedRestaurants, setSelectedSortOption, setSortedRestaurants, selectedSortOption} = useRestaurantSorting(routeRestaurants ?? []);
    const [allRestaurants, setAllRestaurants] = useState<RestaurantType[]>(routeAllRestaurants ?? []);
    const [refreshing, setRefreshing] = useState(false);
    const [key, setKey] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [shuffleKey, setShuffleKey] = useState(0);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTER_STATE });

    useEffect(() => {
        return () => {
            setFilters({ ...DEFAULT_FILTER_STATE });
        };
    }, []);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.openNow) count++;
        if (filters.delivery) count++;
        if (filters.collection) count++;
        if (filters.hasDeals) count++;
        if (filters.minRating > 0) count++;
        if (filters.maxDeliveryCost < 10) count++;
        count += filters.selectedCuisines.length;
        return count;
    }, [filters]);

    const applyFilters = useCallback((restaurants: RestaurantType[], f: FilterState): RestaurantType[] => {
        let results = restaurants;

        if (f.openNow) {
            results = results.filter(r => r.isOpenNowForDelivery || r.isOpenNowForCollection);
        }
        if (f.delivery) {
            results = results.filter(r => r.isDelivery);
        }
        if (f.collection) {
            results = results.filter(r => r.isCollection);
        }
        if (f.hasDeals) {
            results = results.filter(r => r.deals && r.deals.length > 0);
        }
        if (f.minRating > 0) {
            results = results.filter(r => r.rating.starRating >= f.minRating);
        }
        if (f.maxDeliveryCost < 10) {
            results = results.filter(r => (r.deliveryCost ?? 0) <= f.maxDeliveryCost);
        }
        if (f.selectedCuisines.length > 0) {
            results = results.filter(r =>
                r.cuisines.some(c => f.selectedCuisines.includes(c.uniqueName ?? ''))
            );
        }

        return results;
    }, []);

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
    }, [sortedRestaurants, allRestaurants, searchQuery, shuffleKey, filters, applyFilters]);

    const matchCount = useMemo(() => {
        let base: RestaurantType[];

        if (searchQuery.trim()) {
            base = filterRestaurants(allRestaurants, searchQuery);
        } else {
            base = allRestaurants;
        }

        return applyFilters(base, filters).length;
    }, [allRestaurants, searchQuery, filters, applyFilters]);

    const onRefresh = async () => {
        setRefreshing(true);
        const result = await handleSearch(postcode);
        if (result.ok) {
            setSelectedSortOption('');
            setSortedRestaurants(result.restaurants);
            setAllRestaurants(result.allRestaurants);
            setKey(prevKey => prevKey + 1);
            setShuffleKey(prev => prev + 1);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        navigation.setOptions({
            title: `Restaurants at ${postcode}`,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: isDarkMode ? '#1A1A18' : '#F8F9FA',
            },
            headerTintColor: '#FF8000',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
                color: '#FF8000',
            },
        });
    }, [navigation, postcode, isDarkMode]);

    return (
        <View style={[displayPageStyles.fullview, isDarkMode && displayPageStyles.darkfullview]}>
            <View style={displayPageStyles.countBar}>
                <Text style={[displayPageStyles.countText, isDarkMode && displayPageStyles.darkcountText]}>
                    {searchQuery.trim() || activeFilterCount > 0
                        ? `${matchCount} of ${allRestaurants.length} restaurants`
                        : `${allRestaurants.length} restaurants`}
                </Text>
            </View>
            <FilterSearchBar
                query={searchQuery}
                onChangeText={setSearchQuery}
                isDarkMode={isDarkMode}
                onFilterPress={() => setFilterModalVisible(true)}
                activeFilterCount={activeFilterCount}
            />
            <SelectListComponent
                setSelected={(value: string) => setSelectedSortOption(value)}
                isDarkMode={isDarkMode}
                selected={selectedSortOption}
                key={key}
            />
            <View style={displayPageStyles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={filteredRestaurants}
                    renderItem={({ item }) => {
                        const cuisines = filterCuisines(item);
                        return (
                            <RestaurantCard
                                item={item}
                                isDarkMode={isDarkMode}
                                cuisines={cuisines}
                                navigation={navigation}
                            />
                        );
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    ListFooterComponent={<View style={displayPageStyles.listfooterComponent} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#FF8000']}
                            tintColor={isDarkMode ? '#FFFFFF' : '#000000'}
                        />
                    }
                />
            </View>
            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={setFilters}
                currentFilters={filters}
                isDarkMode={isDarkMode}
            />
        </View>
    );
};

export default DisplayPage;
