import React, { useEffect } from 'react';
import { useColorScheme, Text, View, StyleSheet, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {validatePostcode, fetchRestaurantsFromJustEat} from '../functions/API_Functions/apiRequest';

const MainPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const [postcode, setPostcode] = React.useState('');
  useEffect(() => {
    //Show page title
    navigation.setOptions({
      title: 'Just Eat Postcode Search',
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

  async function handleSearch(text: string): Promise<any[] | null> {
    // Create a timeout promise that resolves to "TIMEOUT" after 3000ms
    const timeoutPromise = new Promise<string>((resolve) =>
      setTimeout(() => resolve('TIMEOUT'), 3000)
    );

    // Race the validation promise against the timeout promise
    const validationResult = await Promise.race([
      validatePostcode(text),
      timeoutPromise,
    ]);

    if (validationResult === 'TIMEOUT') {
      console.log('Validation API request timed out. Sending postcode directly to Just Eat API.');
      return await fetchRestaurantsFromJustEat(text);
    } else {
      console.log('Postcode validated successfully. Fetching restaurants from Just Eat API.');
      return await fetchRestaurantsFromJustEat(text);
    }
  }

  const onSubmit = async (text: string) => {
    text = text.replace(/\s/g, '').toUpperCase();
    const ten_restaurants = await handleSearch(text);
    if (ten_restaurants) {
      navigation.navigate('DisplayPage', { postcode: text, restaurants: ten_restaurants });
    } else {
      Alert.alert('Invalid postcode', 'This postcode is not a valid UK postcode.');
      console.log('Invalid postcode, this postcode is not a valid UK postcode.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Find Restaurants Near You</Text>
        <SearchBar
          placeholder="UK postcode, e.g. SW1A 1AA"
          onChangeText={((text: string) => setPostcode(text))}
          onClear={() => setPostcode('')}
          value={postcode}
          onSubmitEditing={() => onSubmit(postcode)}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          placeholderTextColor="#888" // Subtle placeholder color
          searchIcon={null}
          clearIcon={null} // Subtle clear icon color
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
