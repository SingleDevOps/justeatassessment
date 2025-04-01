import React, { useEffect } from 'react';
import { useColorScheme, Text, View, StyleSheet, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';


const MainPage = ({ navigation, route }: { navigation: any, route: any }) => {
  useEffect(() => {
    //Show page title
    navigation.setOptions({
      title: 'Just Eat Postcode Search',
      //the title is italic
      //the title should be in the center
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#FF8000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
    });
  }, [navigation, route]);
  const [postcode, setPostcode] = React.useState('');

  async function handleSearch(text: string) {
    text = text.replace(/\s/g, '');
    const validation_url = `https://postcodes.io/postcodes/${text}/validate`;
    //Validate the postcode using API of postcodes.io
    var result = await (fetch(validation_url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result === true) {
          console.log('Valid postcode');
          //Fetch restaurants details using Just Eat API Endpoint
          const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${text}`;
          return fetch(url, {
            method: 'GET',
          })
            .then((response) => response.json())
            .then((data) => {
              const restaurants = data.restaurants;
              const ten_restaurants = restaurants.slice(0, 10);
              console.log(ten_restaurants);
              return ten_restaurants;
            });
        } else {
          console.log('Invalid postcode');
          return null;
        }
      }
      ));

    return result;
  }
  const onSubmit = async (text: string) => {
    const ten_restaurants = await handleSearch(text);
    if (ten_restaurants) {
      navigation.navigate('DisplayPage', { postcode: postcode, restaurants: ten_restaurants });
    } else {
      Alert.alert('Invalid postcode', 'This postcode is not a valid UK postcode.');
      console.log('Invalid postcode');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Find Restaurants Near You</Text>
        <SearchBar
          placeholder="UK postcode, e.g. SW1A 1AA"
          onChangeText={(text) => setPostcode(text)}
          onClear={() => setPostcode('')}
          value={postcode}
          onSubmitEditing={() => onSubmit(postcode)}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          placeholderTextColor="#888" // Subtle placeholder color
          searchIcon={false}
          clearIcon={false} // Subtle clear icon color
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light gray background for the main page
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: '100%',
    marginTop: -150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  searchBarContainer: {
    shadowColor: 'gray', // Add subtle shadow for depth
    backgroundColor: '#F8F9FA', // Remove default grey background
    borderTopWidth: 0, // Remove top border
    borderBottomWidth: 0, // Remove bottom border
    paddingHorizontal: 1, // Remove extra padding
    marginLeft: 20,
    marginRight: 20,
    width: '90%',
  },
  searchInputContainer: {
    backgroundColor: 'white', // Set clean white background for input field
    borderRadius: 25, // Rounded corners for modern look
    height: 60,
    shadowColor: '#000', // Add subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Softer shadow opacity
    shadowRadius: 4, // Smooth shadow blur
    elevation: 3, // Elevation for Android shadow
  },
  searchInput: {
    fontSize: 16,
    color: '#333', // Text color inside the input field
    paddingHorizontal: 10, // Adjust text padding inside input field
  },
});



export default MainPage;
