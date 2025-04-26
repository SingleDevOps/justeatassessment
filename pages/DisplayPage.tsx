import React, { useEffect, useState } from 'react';
import { useColorScheme, View, Text, Image, FlatList, TouchableHighlight } from 'react-native';
import { sortResData } from '../functions/Sorting_Functions/sortRestaurantData';
import { SelectList } from 'react-native-dropdown-select-list';
import { displayPageStyles } from '../stylesheets/DisplayPage_StyleSheet';
import { filterCuisines } from '../functions/Filtering_Functions/filter';


const DisplayPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const { restaurants } = route.params; //Get the restaurant data from MainPage.
  const [postcode, setPostcode] = useState('');
  const [selected, setSelected] = React.useState(''); //State for the selected sorting option.
  const [sortedRestaurants, setSortedRestaurants] = useState(restaurants); //State for the sorted restaurant data.

  const selectListOptions = [ //Options for the sorting dropdown list.
    { key: '1', value: 'Rating (High to Low)' },
    { key: '2', value: 'Rating (Low to High)' },
    { key: '3', value: 'Rating Count (More to Less)' },
    { key: '4', value: 'Rating Count (Less to More)' },
    { key: '5', value: 'Name (A-Z)' },
    { key: '6', value: 'Name (Z-A)' },
  ];
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';


  useEffect(() => {   // Prevents infinite postcode rendering on the header
    if (route.params.postcode && route.params.postcode !== postcode) {
      setPostcode(route.params.postcode);
    }
  }, [route.params.postcode, postcode]);

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
  }, [navigation, route, postcode, route.params.postcode, isDarkMode]);

  useEffect(() => { //When the selected sorting option changes, sort the restaurant data accordingly.
    if (selected) {
      switch(selected){
        case 'Rating (High to Low)':
          setSortedRestaurants(sortResData(restaurants, 'desc'));
          break;

        case 'Rating (Low to High)':
          setSortedRestaurants(sortResData(restaurants, 'asc'));
          break;

        case 'Rating Count (More to Less)':
          setSortedRestaurants(sortResData(restaurants, 'moreToLessRatingCount'));
          break;

        case 'Rating Count (Less to More)':
          setSortedRestaurants(sortResData(restaurants, 'lessToMoreRatingCount'));
          break;

        case 'Name (A-Z)':
          setSortedRestaurants(sortResData(restaurants, 'A-Z'));
          break;

        case 'Name (Z-A)':
          setSortedRestaurants(sortResData(restaurants, 'Z-A'));
          break;
      }
    } else {
      setSortedRestaurants(restaurants); // If no selection yet, show unsorted data.
    }
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
                    <Image //******************    The Restaurant Logo   **********************/
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
                    <Text style={[displayPageStyles.cuisine, isDarkMode && displayPageStyles.darkcuisine]}>{cuisines}</Text>
                    <View style={displayPageStyles.addressContainer}> {/* The address container, with pin icon and address text */}
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
