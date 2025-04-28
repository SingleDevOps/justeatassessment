import React, { useEffect, useState } from 'react';
import { useColorScheme, View, Image, FlatList } from 'react-native';
import { sortResData } from '../functions/Sorting_Functions/sortRestaurantData';
import { SelectList } from 'react-native-dropdown-select-list';
import { displayPageStyles } from '../stylesheets/DisplayPage_StyleSheet';
import { filterCuisines } from '../functions/Filtering_Functions/filter';
import { selectListOptions } from '../functions/Sorting_Functions/sortingOptions';
import { RestaurantCard } from '../components/restaurantCard';

const DisplayPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const { restaurants } = route.params; //Get the restaurant data from MainPage.
  const [postcode, setPostcode] = useState('');
  const [selected, setSelected] = React.useState(''); //State for the selected sorting option.
  const [selectedRestaurants, setSelectedRestaurants] = useState(restaurants); //State for the sorted restaurant data.
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

  useEffect(() => { //When the selected sorting option changes, sort the restaurant data accordingly.
    if (selected) {
      switch(selected){
        case 'Rating (High to Low)':
          setSelectedRestaurants(sortResData(restaurants, 'desc'));
          break;

        case 'Rating (Low to High)':
          setSelectedRestaurants(sortResData(restaurants, 'asc'));
          break;

        case 'Rating Count (More to Less)':
          setSelectedRestaurants(sortResData(restaurants, 'moreToLessRatingCount'));
          break;

        case 'Rating Count (Less to More)':
          setSelectedRestaurants(sortResData(restaurants, 'lessToMoreRatingCount'));
          break;

        case 'Name (A-Z)':
          setSelectedRestaurants(sortResData(restaurants, 'A-Z'));
          break;

        case 'Name (Z-A)':
          setSelectedRestaurants(sortResData(restaurants, 'Z-A'));
          break;
      }
    }
    // else {
    //   setSelectedRestaurants(restaurants); // If no selection yet, show unsorted data.
    // }
  }, [selected, restaurants]);



  return (
    <View style={[displayPageStyles.fullview, isDarkMode && displayPageStyles.darkfullview]}>
      <SelectList //The selectlist displays sorting options.
        arrowicon={<Image source={require('../images/downarrow.png')} tintColor={isDarkMode ? 'white' : 'black'} style={displayPageStyles.downarrow} />}
        setSelected={(value:string) => setSelected(value)}
        data={selectListOptions}
        save="value"
        placeholder="Sort By"
        // eslint-disable-next-line react-native/no-inline-styles
        inputStyles={isDarkMode ? { color: 'white' } : { color: 'black' }}
        search={false}
        boxStyles={isDarkMode ? displayPageStyles.darkDropdownBox : displayPageStyles.dropdownBox}
        dropdownStyles={isDarkMode ? displayPageStyles.darkDropdown : displayPageStyles.dropdown}
        dropdownTextStyles={isDarkMode ? displayPageStyles.darkDropdownText : displayPageStyles.dropdownText}
      />
      {/********************* The container of all restaurant cards *************************/}
      <View style={displayPageStyles.container}>
        {/* The FlatList for showing each restaurant */}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={selectedRestaurants}
          renderItem={({ item }) => {
            const cuisines = filterCuisines(item);
            return (
              <RestaurantCard
              style={displayPageStyles}
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
