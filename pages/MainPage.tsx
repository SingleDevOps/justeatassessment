import React, { useEffect } from 'react';
import { useColorScheme, Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import {handleSearch} from '../functions/API_Functions/apiRequest';

const MainPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const [postcode, setPostcode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    //Show page title, and header style setting.
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

  const onSubmit = async (text: string) => {    //The handleSearch function is in 'functions/API_Functions/apiRequest.ts'
    text = text.replace(/\s/g, '').toUpperCase(); //Strip all spaces for API Calls.
    setLoading(true);
    const ten_restaurants = await handleSearch(text); //Ten Restaurants waiting to be returned.
    setLoading(false);
    if (ten_restaurants) {
      navigation.navigate('DisplayPage', { postcode: text, restaurants: ten_restaurants }); //When the ten restaurants data is received, navigate to the DisplayPage and send parameters to the page.
    } else {
      Alert.alert('Invalid postcode', 'This postcode is not a valid UK postcode.');  //If not received, alert the user.
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
          /* Three styles for adjusting how the searchBar looks*/
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          placeholderTextColor="#888" // Subtle placeholder color
          searchIcon={null} //Hide searchIcon
          clearIcon={null} //Hide clearIcon
          showLoading={loading} // ActivityIndicator for showing loading status.
          loadingProps={{color: '#FF8000', size: 'small'}} // Style of loading indicator
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //Span the whole page
    backgroundColor: '#F8F9FA', // Light gray background for the main page
    paddingHorizontal: 20, //Padding for the search Bar
    justifyContent: 'center',
  },
  searchContainer: {
    width: '100%',
    marginTop: -180, //Move up to make the search bar appear in the middle instead of the text.
  },
  title: { //style of the text "Find Restaurants Near You"
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
    borderRadius: 25,
    height: 60,
    shadowColor: '#000', // Add subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Softer shadow opacity
    shadowRadius: 4, // Smooth shadow blur
    elevation: 8,
  },
  searchInput: {
    fontSize: 16,
    color: '#333', // Text color inside the input field
    paddingHorizontal: 10, // Adjust text padding inside input field
  },
});



export default MainPage;
