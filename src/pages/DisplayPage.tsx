import React, { useEffect, useState, useMemo } from 'react';
import { useColorScheme, View, Text, FlatList, RefreshControl } from 'react-native';
import { displayPageStyles } from '../stylesheets/pages/displayPage';
import { filterCuisines } from '../functions/filtering/filter';
import { filterRestaurants, shuffleArray, SEARCH_RESULT_LIMIT } from '../functions/filtering/searchRestaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { SelectListComponent } from '../components/SelectList';
import { FilterSearchBar } from '../components/FilterSearchBar';
import { useRestaurantSorting } from '../hooks/useRestaurantSorting';
import { handleSearch } from '../functions/api/apiRequest';
import type { DisplayPageProps } from '../types/navigation';
import type { RestaurantType } from '../types/restaurant';

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

  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedRestaurants;
    }
    const results = filterRestaurants(allRestaurants, searchQuery);
    return shuffleArray(results).slice(0, SEARCH_RESULT_LIMIT);
  }, [sortedRestaurants, allRestaurants, searchQuery, shuffleKey]);

  const matchCount = useMemo(() => {
    if (!searchQuery.trim()) {
      return allRestaurants.length;
    }
    return filterRestaurants(allRestaurants, searchQuery).length;
  }, [allRestaurants, searchQuery]);

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
          {searchQuery.trim()
            ? `${matchCount} of ${allRestaurants.length} restaurants`
            : `${allRestaurants.length} restaurants`}
        </Text>
      </View>
      <FilterSearchBar
        query={searchQuery}
        onChangeText={setSearchQuery}
        isDarkMode={isDarkMode}
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
    </View>
  );
};

export default DisplayPage;
