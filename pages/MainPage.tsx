import React, { useEffect } from 'react';
import { Keyboard, useColorScheme, Text, View, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { handleSearch } from '../functions/API_Functions/apiRequest';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { mainpageStyles } from '../stylesheets/MainPage_StyleSheet';
import { useNetInfo } from '@react-native-community/netinfo';
import * as sampleData from './L40TH.json'; //Sample data for display if users cannot use the API


const MainPage = ({ navigation, route }: { navigation: any, route: any }) => {

  const [postcode, setPostcode] = React.useState('');
  const [loading, setLoading] = React.useState(false); // State for showing loading activity
  const [keyboardVisible, setKeyboardVisible] = React.useState(false); //State for keyboard visibility, to adjust the position of the search bar, so it won't be covered by the keyboard.
  const hasInternet = useNetInfo().isConnected;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(isDarkMode ? '#262626' : 'gray');

    navigation.setOptions({ //Show page title, and header style setting.
      title: '', //Empty String for no title
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: isDarkMode ? '#1A1A18' : '#F8F9FA',
      },
    });

    const keyboardDidShowListener = Keyboard.addListener( // Add listener for keyboard show event to adjust the search bar position.
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener( // Add listener for keyboard hide event to adjust the search bar position.
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove(); // Remove the keyboard listeners when the component unmounts.
      keyboardDidHideListener.remove();
    };
  }, [navigation, route, isDarkMode]);

  const onSubmit = async (text: string):Promise<any | null> => {    //The "handleSearch" function is imported from 'functions/API_Functions/apiRequest.ts'

    text = text.replaceAll(' ','').toUpperCase();

    if (!text || text === 'L40TH') {  // Using sample data for users having trouble with the API.
      const ten_restaurants = sampleData.restaurants.slice(0, 10);
      setLoading(true);
      setTimeout(() => { //Pretend to load for one second.
        setLoading(false);
        navigation.navigate('DisplayPage', {postcode: 'L40TH', restaurants: ten_restaurants});
      },1000);
      console.log('Using Sample Data from L40TH.json');
      return null;
    }

    setLoading(true); // Loading Activity Indicator is shown
    const ten_restaurants:any = await handleSearch(text);
    setLoading(false); // Loading Activity Indicator is removed when the loding is finished.
    if (ten_restaurants !== false) {
      navigation.navigate('DisplayPage', { postcode: text, restaurants: ten_restaurants }); //When the ten restaurants data is received, navigate to the DisplayPage and send parameters to the page.
    } else {
      if (!hasInternet){
        Alert.alert('No Internet Connection', 'Please check your internet.');
        console.log('No Internet Connection.');
      }
      else{
        Alert.alert('Invalid Postcode','You may have entered the wrong postal code, or it has been terminated.'); //If there is Internet, the issue lies on the postal code itself.
        console.log('Postal Code Validation Error');
      }
    }
  };



  return (
    // The main page of the app, which contains the search bar and logo.
    // The search bar allows users to enter a UK postcode to find restaurants at this postcode.
    // The logo is displayed at the top of the page.
    // The page also handles keyboard visibility to adjust the layout accordingly.

    <View style={[mainpageStyles.overAll, isDarkMode && mainpageStyles.darkOverAll]}>
      <KeyboardAvoidingView
        style={mainpageStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVisible ? 30 : 0}
      >
        {/* The MainPage has two parts: the brand logo and the search bar */}
        <View style={[mainpageStyles.container, isDarkMode && mainpageStyles.darkcontainer]}>
          <View>
            <Image //************** The logo of Just Eat ***************/
              source={require('../images/just-eat-logo.png')}
              style={mainpageStyles.logo}
            />
          </View>
          {/* The search bar contains a title and the search bar */}
          <View style={mainpageStyles.searchContainer}>
            <View style={mainpageStyles.twoTexts}>
              <Text style={[mainpageStyles.titleFirstpart, isDarkMode && mainpageStyles.titleFirstpart]}>Find Restaurants </Text>
              <Text style={[mainpageStyles.titleSecondpart, isDarkMode && mainpageStyles.darktitleSecondpart]}>Near You</Text>
            </View>
            <SearchBar
              placeholder="Enter a UK Postcode"
              onChangeText={((text: string) => setPostcode(text))}
              value={postcode}
              onSubmitEditing={() => onSubmit(postcode)}
              containerStyle={[mainpageStyles.searchBarContainer, isDarkMode && mainpageStyles.darksearchBarContainer]} /* Three Styles for adjusting how the searchBar looks*/
              inputContainerStyle={[mainpageStyles.searchInputContainer, isDarkMode && mainpageStyles.darksearchInputContainer]}
              inputStyle={[mainpageStyles.searchInput, isDarkMode && mainpageStyles.darksearchInput]}
              placeholderTextColor="#888"
              searchIcon={null}
              clearIcon={null}
              showLoading={loading} // ActivityIndicator for showing loading status.
              loadingProps={{ color: '#FF8000', size: 'small' }} // Style of loading indicator
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MainPage;
