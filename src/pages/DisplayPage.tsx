import React, { useEffect, useState } from 'react';
import { useColorScheme, View, FlatList, RefreshControl } from 'react-native';
import { displayPageStyles } from '../stylesheets/Pages/DisplayPage_StyleSheet';
import { filterCuisines } from '../functions/Filtering_Functions/filter';
import { RestaurantCard } from '../components/restaurantCardComponent';
import { SelectListComponent } from '../components/selectListComponent';
import { useRestaurantSorting } from '../hooks/useRestaurantSorting';
import { handleSearch } from '../functions/API_Functions/apiRequest';

const DisplayPage = ({ navigation, route }: { navigation:any, route:any }) => {
  const { restaurants } = route.params; //Get the restaurant data from MainPage.
  const [postcode, setPostcode] = useState('L40TH'); // Default Value for sample data
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const {sortedRestaurants, setSelectedSortOption, setSortedRestaurants, selectedSortOption} = useRestaurantSorting(restaurants);
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    const newRestaurants = await handleSearch(postcode);
    if (newRestaurants && Array.isArray(newRestaurants)) {
      setSelectedSortOption(''); // Reset sorting to show new restaurants in original order
      setSortedRestaurants(newRestaurants);
      setKey(prevKey => prevKey + 1); // Force the re-render of the SelectListComponent by updating the key
    }
    setRefreshing(false);
  };

  useEffect(() => {    //Show page title, and its style setting
    navigation.setOptions({
      title: `Restaurants at ${postcode}`,
      fontsize: 20,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: isDarkMode ? '#1A1A18' : '#F8F9FA',
      },
      headerTintColor: '#FF8000', // Just Eat Orange, the return arrow's color.
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FF8000',
      },
    },);

    if (route.params.postcode && route.params.postcode !== postcode) { // Prevents infinite postcode rendering on the header
      setPostcode(route.params.postcode);
    }
  }, [navigation, route, postcode, route.params.postcode, isDarkMode]);

  return (
    <View style={[displayPageStyles.fullview, isDarkMode && displayPageStyles.darkfullview]}>
      <SelectListComponent //The selectlist displays sorting options.
        setSelected={(value: string) => setSelectedSortOption(value)}
        isDarkMode={isDarkMode}
        selected={selectedSortOption}
        key={key}
      />
      {/********************* The container of all restaurant cards *************************/}
      <View style={displayPageStyles.container}>
        {/* The FlatList for showing each restaurant */}
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
                cuisines={cuisines} />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={<View style={displayPageStyles.listfooterComponent} />} // Add extra space so that the last card is not blocked by Android's navigation bar.
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FF8000']} // Just Eat Orange color
              tintColor={isDarkMode ? '#FFFFFF' : '#000000'} // White in dark mode, black in light mode
            />
          }
        />
      </View>
    </View>
  );
};

export default DisplayPage;
