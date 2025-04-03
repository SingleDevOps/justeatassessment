import React, { useEffect } from 'react';
import { useColorScheme, Text, View, Alert, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { handleSearch } from '../functions/API_Functions/apiRequest';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { mainpageStyles } from '../stylesheets/MainPage_StyleSheet';


const MainPage = ({ navigation, route }: { navigation: any, route: any }) => {

  const [postcode, setPostcode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  useEffect(() => {
    //Show page title, and header style setting.
    navigation.setOptions({
      title: 'Restaurant Search',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: isDarkMode ? '#1A1A18' : '#F8F9FA',
      },
      headerTintColor: '#FF8000',
      headerTitleStyle: {
        fontFamily: 'OpenSans-Italic',
        fontWeight: 'bold',
        fontSize: 20,
        color: isDarkMode ? 'white' : 'black',
      },
    });
  }, [navigation, route, isDarkMode]);

  const onSubmit = async (text: string) => {    //The handleSearch function is in 'functions/API_Functions/apiRequest.ts'
    if (!text) { return null; } //If the user submits empty string, return null.
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


  SystemNavigationBar.setNavigationColor(isDarkMode ? '#262626' : 'gray');
  return (
    <View style={[mainpageStyles.container, isDarkMode && mainpageStyles.darkcontainer]}>
      <View styles={mainpageStyles.logoContainer}>
        <Image
          source={require('../images/new_just_eat_logo_.png')}
          style={mainpageStyles.logo}
        />
      </View>
      <View style={mainpageStyles.searchContainer}>
        <Text style={[mainpageStyles.title, isDarkMode && mainpageStyles.darktitle]}>Find Restaurants Near You</Text>
        <SearchBar
          placeholder="UK postcode, e.g. SW1A 1AA"
          onChangeText={((text: string) => setPostcode(text))}
          value={postcode}
          onSubmitEditing={() => onSubmit(postcode)}

          /* Three mainpageStyles for adjusting how the searchBar looks*/
          containerStyle={[mainpageStyles.searchBarContainer, isDarkMode && mainpageStyles.darksearchBarContainer]}
          inputContainerStyle={[mainpageStyles.searchInputContainer, isDarkMode && mainpageStyles.darksearchInputContainer]}
          inputStyle={[mainpageStyles.searchInput, isDarkMode && mainpageStyles.darksearchInput]}

          placeholderTextColor= "#888" // Subtle placeholder color
          searchIcon={null} //Hide searchIcon
          clearIcon={null} //Hide clearIcon
          showLoading={loading} // ActivityIndicator for showing loading status.
          loadingProps={{ color: '#FF8000', size: 'small' }} // Style of loading indicator
        />
      </View>
    </View>
  );
};

export default MainPage;
