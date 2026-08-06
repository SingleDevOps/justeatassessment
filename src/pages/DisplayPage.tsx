import React, { useEffect, useMemo } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { displayPageStyles } from '../stylesheets/pages/displayPage';
import { filterCuisines } from '../functions/filtering/filter';
import { getDeliveryFeesEntry, getFreeDeliveryLabel } from '../functions/filtering/deliveryFees';
import { RestaurantCard } from '../components/RestaurantCard';
import { FilterSearchBar } from '../components/FilterSearchBar';
import { FilterModal } from '../components/FilterModal';
import { FilterChipsBar } from '../components/FilterChipsBar';
import { LocalLegendsCarousel } from '../components/LocalLegendsCarousel';
import { ErrorStateView } from '../components/icons/ErrorStateView';
import { useDisplayPageViewModel } from '../viewmodels/useDisplayPageViewModel';
import { useUserLocation } from '../hooks/useUserLocation';
import { usePieTheme } from '../hooks/usePieTheme';
import { haversineDistanceMeters } from '../functions/map/distance';
import { getRestaurantLatLng } from '../components/RestaurantMap';
import type { DisplayPageProps } from '../types/navigation';
import type { RestaurantType } from '../types/restaurant';

const DisplayPage = ({ navigation, route }: DisplayPageProps) => {
    const { theme, isDarkMode } = usePieTheme();
    const vm = useDisplayPageViewModel({ route });
    const { userLocation } = useUserLocation();
    const styles = displayPageStyles(theme);

    const distanceMap = useMemo(() => {
        if (!userLocation) {
            return {};
        }
        const map: Record<string, number> = {};
        vm.allRestaurants.forEach((restaurant: RestaurantType) => {
            const coordinate = getRestaurantLatLng(restaurant);
            if (coordinate) {
                map[restaurant.id.toString()] = haversineDistanceMeters(userLocation, coordinate);
            }
        });
        return map;
    }, [userLocation, vm.allRestaurants]);

    useEffect(() => {
        navigation.setOptions({
            title: `Restaurants at ${vm.postcode}`,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: theme.color.backgroundDefault,
            },
            headerTintColor: theme.color.interactiveBrand,
            headerBackButtonDisplayMode: 'minimal',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: theme.fontSize.size20,
                color: theme.color.interactiveBrand,
            },
        });
    }, [navigation, vm.postcode, isDarkMode, theme]);

    const showCarousel = vm.searchQuery.trim() === '' && vm.localLegendsRestaurants.length > 0;

    return (
        <View style={styles.fullview}>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={vm.filteredRestaurants}
                renderItem={({ item }) => {
                    const cuisines = filterCuisines(item);
                    const gpsDistance = distanceMap[item.id.toString()];
                    return (
                        <View style={styles.container}>
                            <RestaurantCard
                                item={item}
                                theme={theme}
                                cuisines={cuisines}
                                navigation={navigation}
                                distanceMeters={gpsDistance ?? item.driveDistanceMeters ?? null}
                                distanceIsFromUser={gpsDistance !== undefined}
                                isPromoted={vm.isPromoted(item.id)}
                                isBoosted={item.isTemporaryBoost}
                                freeDeliveryLabel={getFreeDeliveryLabel(item.id, vm.deliveryFees)}
                            />
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View>
                        <View style={styles.countBar}>
                            {vm.metaData && (
                                <Text style={styles.areaText} testID="area-header">
                                    {vm.metaData.area} · {vm.metaData.postalCode}
                                </Text>
                            )}
                            <Text style={styles.countText}>
                                {vm.searchQuery.trim() || vm.activeFilterCount > 0
                                    ? `${vm.matchCount} of ${vm.allRestaurants.length} restaurants`
                                    : `${vm.allRestaurants.length} restaurants`}
                            </Text>
                        </View>
                        <FilterSearchBar
                            query={vm.searchQuery}
                            onChangeText={vm.setSearchQuery}
                            theme={theme}
                            onFilterPress={() => vm.toggleFilterModal(true)}
                            activeFilterCount={vm.activeFilterCount}
                        />
                        <FilterChipsBar
                            defs={vm.layoutFilterDefs}
                            selectedIds={vm.layoutFilters}
                            onToggle={vm.toggleLayoutFilter}
                            theme={theme}
                        />
                        {showCarousel && (
                            <View style={styles.container}>
                                <LocalLegendsCarousel
                                    restaurants={vm.localLegendsRestaurants}
                                    theme={theme}
                                    onPress={(restaurant) =>
                                        navigation.navigate('RestaurantDetailPage', {
                                            restaurant,
                                            deliveryFees: getDeliveryFeesEntry(restaurant.id, vm.deliveryFees),
                                        })
                                    }
                                />
                            </View>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyStateContainer}>
                        <ErrorStateView
                            illustration="emptyResults"
                            title="No restaurants found"
                            message="Try a different search, or clear the active filters to see more results."
                            theme={theme}
                        />
                    </View>
                }
                ListFooterComponent={<View style={styles.listfooterComponent} />}
                refreshControl={
                    <RefreshControl
                        refreshing={vm.refreshing}
                        onRefresh={vm.onRefresh}
                        colors={[theme.color.interactiveBrand]}
                        tintColor={theme.color.contentDefault}
                    />
                }
            />
            <FilterModal
                visible={vm.filterModalVisible}
                onClose={() => vm.toggleFilterModal(false)}
                onApply={(filters, sortOption) => {
                    vm.setFilters(filters);
                    vm.setSelectedSortOption(sortOption);
                }}
                currentFilters={vm.filters}
                currentSortOption={vm.selectedSortOption}
                theme={theme}
            />
        </View>
    );
};

export default DisplayPage;
