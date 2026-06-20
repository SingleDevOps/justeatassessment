import React, { useEffect, useState } from 'react';
import { useColorScheme, View, FlatList, RefreshControl } from 'react-native';
import { displayPageStyles } from '../stylesheets/pages/displayPage';
import { filterCuisines } from '../functions/filtering/filter';
import { RestaurantCard } from '../components/RestaurantCard';
import { SelectListComponent } from '../components/SelectList';
import { useRestaurantSorting } from '../hooks/useRestaurantSorting';
import { handleSearch } from '../functions/api/apiRequest';
import type { DisplayPageProps } from '../types/navigation';

const DisplayPage = ({ navigation, route }: DisplayPageProps) => {
  const { restaurants, postcode: routePostcode } = route.params ?? {};
  const postcode = routePostcode || 'L40TH';
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const {sortedRestaurants, setSelectedSortOption, setSortedRestaurants, selectedSortOption} = useRestaurantSorting(restaurants ?? []);
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await handleSearch(postcode);
    if (result.ok) {
      setSelectedSortOption('');
      setSortedRestaurants(result.restaurants);
      setKey(prevKey => prevKey + 1);
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
          data={sortedRestaurants}
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
