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
      headerTintColor: '#FF8000', // Just Eat Orange, for the return arrow's color.
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FF8000',
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
        arrowicon={<Image source={require('../images/downarrow.png')} tintColor={isDarkMode ? 'white' : 'black'} style={[displayPageStyles.downarrow, isDarkMode && displayPageStyles.darkdownarrow]} />}
        setSelected={(value) => setSelected(value)}
        data={selectListOptions}
        save="value"
        placeholder="Sort By"
        // eslint-disable-next-line react-native/no-inline-styles
        inputStyles={isDarkMode ? { color: 'white' } : { color: 'black' }} //The placeholder text color based on light mode / dark mode
        search={false}
        // Use placeholderStyle to control the placeholder's text color and size.
        placeholderStyle={[displayPageStyles.placeholder, isDarkMode && displayPageStyles.darkPlaceholder]}
        // Three other styles for the selectlist dropdown list design
        boxStyles={[displayPageStyles.dropdownBox, isDarkMode && displayPageStyles.darkDropdownBox]}
        dropdownStyles={[displayPageStyles.dropdown, isDarkMode && displayPageStyles.darkDropdown]}
        dropdownTextStyles={[displayPageStyles.dropdownText, isDarkMode && displayPageStyles.darkDropdownText]}
      />
      {/********************* The container of all restaurant cards *************************/}
      <View style={displayPageStyles.container}>
        {/* The FlatList for showing each restaurant */}
        <FlatList
          showsVerticalScrollIndicator={false} //Hide Vertical Scrollbar
          showsHorizontalScrollIndicator={false} //Hide Horizontal Scrollbar
          data={sortedRestaurants}
          renderItem={({ item }) => {
            const cuisines = filterCuisines(item);
            return (
              // Each restaurant card
              <TouchableHighlight
                underlayColor={isDarkMode ? '#1A1A18' : '#F8F9FA'}
                onPress={() => { }}
                style={displayPageStyles.touchableHighlight}
              >
                {/********************* The card has two parts: upperPart & lowerPart ********************/}
                <View style={[displayPageStyles.card, isDarkMode && displayPageStyles.darkcard]}>
                  <View style={displayPageStyles.upperPart}>
                    {/******************    The Logo   ******************/}
                    <Image
                      source={{ uri: item.logoUrl }}
                      style={displayPageStyles.image}
                    />
                    <View style={displayPageStyles.textContainer}>
                      <Text style={[displayPageStyles.name, isDarkMode && displayPageStyles.darkname]}>{item.name}</Text>
                      <View style={displayPageStyles.ratingContainer}>
                        <Image style={displayPageStyles.ratingImage} source={require('../images/Just-Eat-Star.png')} />
                        <Text style={displayPageStyles.rating}>{item.rating.starRating}</Text>
                        <Text style={[displayPageStyles.ratingNumbers, isDarkMode && displayPageStyles.darkratingNumbers]}> ({item.rating.count})</Text>
                      </View>
                    </View>
                  </View>
                  {/*********** upperPart Ends ***********/}

                  <View style={displayPageStyles.separator} />

                  {/*********** lowerPart Starts *********/}
                  <View style={displayPageStyles.lowerPart}>
                    {/* The cuisine is separated from the address text */}
                    <Text style={[displayPageStyles.cuisine, isDarkMode && displayPageStyles.darkcuisine]}>{cuisines}</Text>
                    {/* The address container, with pin icon and address text */}
                    <View style={displayPageStyles.addressContainer}>
                      <Text style={[displayPageStyles.pinIcon]}>{'📍'}</Text>
                      <View style={displayPageStyles.addressTextContainer}>
                        <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={[displayPageStyles.address, isDarkMode && displayPageStyles.darkaddress]}>{item.address.firstLine + ', ' + item.address.city}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
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
