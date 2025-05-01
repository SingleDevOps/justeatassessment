import React, { useEffect, useState } from 'react';
import { useColorScheme, View, FlatList } from 'react-native';
import { displayPageStyles } from '../stylesheets/Pages/DisplayPage_StyleSheet';
import { filterCuisines } from '../functions/Filtering_Functions/filter';
import { selectListOptions } from '../functions/Sorting_Functions/sortingOptions';
import { RestaurantCard } from '../components/restaurantCard';
import { SelectListComponent } from '../components/selectList';
import { useRestaurantSorting } from '../hooks/useRestaurantSorting';

const DisplayPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const { restaurants } = route.params; //Get the restaurant data from MainPage.
  const [postcode, setPostcode] = useState('');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

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


  const {sortedRestaurants, setSelectedSortOption} = useRestaurantSorting(restaurants);

  return (
    <View style={[displayPageStyles.fullview, isDarkMode && displayPageStyles.darkfullview]}>
      <SelectListComponent //The selectlist displays sorting options.
        setSelected={(value: string) => setSelectedSortOption(value)}
        selectListOptions={selectListOptions}
        isDarkMode={isDarkMode}
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
        />
      </View>
    </View>
  );
};


export default DisplayPage;
