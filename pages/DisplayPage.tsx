import React, { useEffect, useState } from 'react';
import { useColorScheme, View, Text, Image, FlatList, TouchableHighlight } from 'react-native';
import { sortResData } from '../functions/Sorting_Functions/sortRestaurantData';
import { SelectList } from 'react-native-dropdown-select-list';
import { displayPageStyles } from '../stylesheets/DisplayPage_StyleSheet';
import { filterCuisines } from '../functions/Filtering_Functions/filter';

const DisplayPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const { restaurants } = route.params; //Get the restaurant data from the previous page.
  const [postcode, setPostcode] = useState(''); //State for postcode, to show at the page title.
  const [selected, setSelected] = React.useState(''); //State for the selected sorting option.
  const [sortedRestaurants, setSortedRestaurants] = useState(restaurants); //State for the sorted restaurant data.

  const selectListOptions = [ //Options for the sorting dropdown list.
    { key: '1', value: 'Rating (High to Low)' },
    { key: '2', value: 'Rating (Low to High)' },
  ];
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark mode).
  const isDarkMode = colorScheme === 'dark'; // Check if the current color scheme is dark mode.


  useEffect(() => {   // Prevents infinite postcode rendering on the header
    if (route.params.postcode && route.params.postcode !== postcode) {
      setPostcode(route.params.postcode);
    }
  }, [route.params.postcode, postcode]);

  useEffect(() => {
    //Show page title, and its style setting
    navigation.setOptions({
      title: `Restaurants at ${postcode}`,
      fontsize: 20,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: isDarkMode ? '#1A1A18' : '#F8F9FA',
      },
      headerTintColor: '#FF8000',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: isDarkMode ? 'white' : '#888',
      },
    },);
  }, [navigation, route, postcode, route.params.postcode, isDarkMode]);

  useEffect(() => { //When the selected sorting option changes, sort the restaurant data accordingly.
    if (selected) {
      // "Rating(High to Low)" = descending order.
      if (selected === 'Rating (High to Low)') {
        setSortedRestaurants(sortResData(restaurants, 'desc'));
      }
      // "Rating(Low to High)" = ascending order.
      else if (selected === 'Rating (Low to High)') {
        setSortedRestaurants(sortResData(restaurants, 'asc'));
      }
    } else {
      // If no selection yet, show unsorted data.
      setSortedRestaurants(restaurants);
    }
  }, [selected, restaurants]);



  return ( // The display page of the app, displaying the restaurant data.
    <View style={[displayPageStyles.fullview, isDarkMode && displayPageStyles.darkfullview]}>
      <SelectList //The selectlist displays sorting options.
        setSelected={(value) => setSelected(value)}
        data={selectListOptions}
        save="value"
        placeholder="Sort By"
        search={false}
        // Use placeholderStyle to control the placeholder's text color and size.
        placeholderStyle={[displayPageStyles.placeholder, isDarkMode && displayPageStyles.darkplaceholder]}
        boxStyles={[displayPageStyles.dropdownBox, isDarkMode && displayPageStyles.darkDropdownBox]}
        dropdownStyles={[displayPageStyles.dropdown, isDarkMode && displayPageStyles.darkDropdown]}
        dropdownTextStyles={[displayPageStyles.dropdownText, isDarkMode && displayPageStyles.darkDropdownText]}
      />
      <View style={displayPageStyles.container}>
        <FlatList
          showsVerticalScrollIndicator={false} //Hide Vertical Scrollbar
          showsHorizontalScrollIndicator={false} //Hide Horizontal Scrollbar
          data={sortedRestaurants}
          renderItem={({ item }) => {
            const cuisines = filterCuisines(item);

            return (
              <TouchableHighlight
                underlayColor={isDarkMode ? '#1A1A18' : '#F8F9FA'}
                onPress={() => { }}
                style={displayPageStyles.touchableHighlight}
              >
                <View style={[displayPageStyles.card, isDarkMode && displayPageStyles.darkcard]}>
                  <View style={displayPageStyles.upperPart}>
                    <Image
                      source={{ uri: item.logoUrl }}
                      style={displayPageStyles.image}
                    />
                    <View style={displayPageStyles.textContainer}>
                      <Text style={[displayPageStyles.name, isDarkMode && displayPageStyles.darkname]}>{item.name}</Text>
                      <View style={displayPageStyles.ratingContainer}>
                        <Image style={displayPageStyles.ratingImage} source={require('../images/golden_star.png')} />
                        <Text style={displayPageStyles.rating}>{item.rating.starRating}</Text>
                        <Text style={[displayPageStyles.ratingNumbers, isDarkMode && displayPageStyles.darkratingNumbers]}> ({item.rating.count})</Text>
                      </View>
                    </View>
                  </View>
                  <View style={displayPageStyles.separator} />
                  <View style={displayPageStyles.lowerPart}>
                    <Text style={[displayPageStyles.cuisine, isDarkMode && displayPageStyles.darkcuisine]}>{cuisines}</Text>
                    <View style={displayPageStyles.addressContainer}>
                      <Text style={[displayPageStyles.pinIcon, isDarkMode && displayPageStyles.darkaddress]}>{'📍'}</Text>
                      <Text style={[displayPageStyles.address, isDarkMode && displayPageStyles.darkaddress]}>{item.address.firstLine + ', ' + item.address.city}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={<View style={displayPageStyles.listfooterComponent} />}
        />
      </View>
    </View>
  );
};


export default DisplayPage;
