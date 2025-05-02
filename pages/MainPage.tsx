import React, { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useColorScheme, Text, View, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { handleSearch } from '../functions/API_Functions/apiRequest';
import { mainpageStyles } from '../stylesheets/Pages/MainPage_StyleSheet';
import { useNetInfo } from '@react-native-community/netinfo';
import { SearchBarComponent } from '../components/serachBar';
import { RestaurantType } from '../types/restaurant_type';
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';

const MainPage = ({ navigation, route }: { navigation: any, route: any }) => {

  const [postcode, setPostcode] = React.useState('');
  const [loading, setLoading] = React.useState(false); // State for showing loading activity
  const keyboardVisible = useKeyboardVisible(); //State for keyboard visibility, to adjust the position of the search bar, so it won't be covered by the keyboard.
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
  }, [navigation, route, isDarkMode]);

  const onSubmit = async (text: string): Promise<null> => {    //The "handleSearch" function is imported from 'functions/API_Functions/apiRequest.ts'
    text = text.replaceAll(' ', '').toUpperCase();

    setLoading(true); // Loading Activity Indicator is shown
    const ten_restaurants: (RestaurantType[] | null | boolean) = await handleSearch(text);
    setLoading(false); // Loading Activity Indicator is removed when the loding is finished.

    if (ten_restaurants === null){
      Alert.alert('Error fetching restaurant data', 'The Just Eat API Endpoint is down, or your IP address is not European.');
      return null;
    }

    if (ten_restaurants !== false) {
      navigation.navigate('DisplayPage', { postcode: text, restaurants: ten_restaurants }); //When the ten restaurants data is received, navigate to the DisplayPage and send parameters to the page.
    }
    else {
      if (!hasInternet) {
        Alert.alert('No Internet Connection', 'Please check your internet.');
        // console.log('No Internet Connection.');
      }
      else {
        Alert.alert('Invalid Postcode', 'You may have entered the wrong postal code, or it has been terminated.'); //If there is Internet, the issue lies on the postal code itself.
        // console.log('Postal Code Validation Error');
      }
    }
    return null;
  };



  return (
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
          <View style={mainpageStyles.searchContainer}>
            <View style={mainpageStyles.twoTexts}>
              <Text style={[mainpageStyles.titleFirstpart, isDarkMode && mainpageStyles.titleFirstpart]}>Find Restaurants </Text>
              <Text style={[mainpageStyles.titleSecondpart, isDarkMode && mainpageStyles.darktitleSecondpart]}>Near You</Text>
            </View>
            <SearchBarComponent
              setPostcode={setPostcode}
              loading={loading}
              onSubmit={onSubmit}
              isDarkMode={isDarkMode}
              postcode={postcode}
            />

          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MainPage;
