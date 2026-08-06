import React, { useEffect } from 'react';
import { useColorScheme, View, Text, FlatList, RefreshControl } from 'react-native';
import { displayPageStyles } from '../stylesheets/pages/displayPage';
import { filterCuisines } from '../functions/filtering/filter';
import { RestaurantCard } from '../components/RestaurantCard';
import { FilterSearchBar } from '../components/FilterSearchBar';
import { FilterModal } from '../components/FilterModal';
import { useDisplayPageViewModel } from '../viewmodels/useDisplayPageViewModel';
import type { DisplayPageProps } from '../types/navigation';

const DisplayPage = ({ navigation, route }: DisplayPageProps) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const vm = useDisplayPageViewModel({ route });

    useEffect(() => {
        navigation.setOptions({
            title: `Restaurants at ${vm.postcode}`,
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
    }, [navigation, vm.postcode, isDarkMode]);

    return (
        <View style={[displayPageStyles.fullview, isDarkMode && displayPageStyles.darkfullview]}>
            <View style={displayPageStyles.countBar}>
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
            <View style={displayPageStyles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={vm.filteredRestaurants}
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
                            refreshing={vm.refreshing}
                            onRefresh={vm.onRefresh}
                            colors={['#FF8000']}
                            tintColor={isDarkMode ? '#FFFFFF' : '#000000'}
                        />
                    }
                />
            </View>
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
