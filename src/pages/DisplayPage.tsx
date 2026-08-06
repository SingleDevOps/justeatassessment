import React, { useEffect, useMemo } from 'react';
import { useColorScheme, View, Text, FlatList, RefreshControl } from 'react-native';
import { displayPageStyles } from '../stylesheets/pages/displayPage';
import { filterCuisines } from '../functions/filtering/filter';
import { getDeliveryFeesEntry, getFreeDeliveryLabel } from '../functions/filtering/deliveryFees';
import { RestaurantCard } from '../components/RestaurantCard';
import { FilterSearchBar } from '../components/FilterSearchBar';
import { FilterModal } from '../components/FilterModal';
import { FilterChipsBar } from '../components/FilterChipsBar';
import { LocalLegendsCarousel } from '../components/LocalLegendsCarousel';
import { useDisplayPageViewModel } from '../viewmodels/useDisplayPageViewModel';
import { useUserLocation } from '../hooks/useUserLocation';
import { haversineDistanceMeters } from '../functions/map/distance';
import { getRestaurantLatLng } from '../components/RestaurantMap';
import type { DisplayPageProps } from '../types/navigation';
import type { RestaurantType } from '../types/restaurant';

const DisplayPage = ({ navigation, route }: DisplayPageProps) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const vm = useDisplayPageViewModel({ route });
    const { userLocation } = useUserLocation();

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
                backgroundColor: isDarkMode ? '#1A1A18' : '#F8F9FA',
            },
            headerTintColor: '#FF8000',
            headerBackButtonDisplayMode: 'minimal',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
                color: '#FF8000',
            },
        });
    }, [navigation, vm.postcode, isDarkMode]);

    const showCarousel = vm.searchQuery.trim() === '' && vm.localLegendsRestaurants.length > 0;

    return (
        <View style={[displayPageStyles.fullview, isDarkMode && displayPageStyles.darkfullview]}>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={vm.filteredRestaurants}
                renderItem={({ item }) => {
                    const cuisines = filterCuisines(item);
                    const gpsDistance = distanceMap[item.id.toString()];
                    return (
                        <View style={displayPageStyles.container}>
                            <RestaurantCard
                                item={item}
                                isDarkMode={isDarkMode}
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
                        <View style={displayPageStyles.countBar}>
                            {vm.metaData && (
                                <Text style={[displayPageStyles.areaText, isDarkMode && displayPageStyles.darkareaText]} testID="area-header">
                                    {vm.metaData.area} · {vm.metaData.postalCode}
                                </Text>
                            )}
                            <Text style={[displayPageStyles.countText, isDarkMode && displayPageStyles.darkcountText]}>
                                {vm.searchQuery.trim() || vm.activeFilterCount > 0
                                    ? `${vm.matchCount} of ${vm.allRestaurants.length} restaurants`
                                    : `${vm.allRestaurants.length} restaurants`}
                            </Text>
                        </View>
                        <FilterSearchBar
                            query={vm.searchQuery}
                            onChangeText={vm.setSearchQuery}
                            isDarkMode={isDarkMode}
                            onFilterPress={() => vm.toggleFilterModal(true)}
                            activeFilterCount={vm.activeFilterCount}
                        />
                        <FilterChipsBar
                            defs={vm.layoutFilterDefs}
                            selectedIds={vm.layoutFilters}
                            onToggle={vm.toggleLayoutFilter}
                            isDarkMode={isDarkMode}
                        />
                        {showCarousel && (
                            <View style={displayPageStyles.container}>
                                <LocalLegendsCarousel
                                    restaurants={vm.localLegendsRestaurants}
                                    isDarkMode={isDarkMode}
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
                ListFooterComponent={<View style={displayPageStyles.listfooterComponent} />}
                refreshControl={
                    <RefreshControl
                        refreshing={vm.refreshing}
                        onRefresh={vm.onRefresh}
                        colors={['#FF8000']}
                        tintColor={isDarkMode ? '#FFFFFF' : '#000000'}
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
                isDarkMode={isDarkMode}
            />
        </View>
    );
};

export default DisplayPage;
