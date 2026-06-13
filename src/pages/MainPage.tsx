import React, { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useColorScheme, Text, View, Alert, Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { handleSearch } from '../functions/api/apiRequest';
import { mainpageStyles } from '../stylesheets/pages/mainPage';
import { useNetInfo } from '@react-native-community/netinfo';
import { SearchBarComponent } from '../components/SearchBar';
import { RestaurantType } from '../types/restaurant';
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';
import type { MainPageProps } from '../types/navigation';


const MainPage = ({ navigation, route }: MainPageProps) => {

  const [postcode, setPostcode] = React.useState('');
  const [loading, setLoading] = React.useState(false); // State for showing loading activity
  const keyboardVisible = useKeyboardVisible(); //State for keyboard visibility, to adjust the position of the search bar, so it won't be covered by the keyboard.
  const hasInternet = useNetInfo().isConnected;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(isDarkMode ? '#262626' : 'gray');

    navigation.setOptions({ //Show page title, and header style setting.
      headerShown: false,
    });
  }, [navigation, route, isDarkMode]);

  const onSubmit = async (text: string): Promise<void> => {
    text = text.replaceAll(' ', '').toUpperCase();

    setLoading(true);
    const ten_restaurants: (RestaurantType[] | null | boolean) = await handleSearch(text);
    setLoading(false);

    if (ten_restaurants === null){
      Alert.alert('Error fetching restaurant data', 'The Just Eat API Endpoint is down, or your IP address is not European.');
      return;
    }

    if (ten_restaurants !== false) {
      navigation.navigate('DisplayPage', { postcode: text, restaurants: ten_restaurants as RestaurantType[] });
    }
    else {
      if (!hasInternet) {
        Alert.alert('No Internet Connection', 'Please check your internet.');
      }
      else {
        Alert.alert('Invalid Postcode', 'You may have entered the wrong postal code, or it has been terminated.');
      }
    }
  };



  return (
    // The search bar allows users to enter a UK postcode to find restaurants at this postcode.
    // The logo is displayed at the top of the page.
    // The page also handles keyboard visibility to adjust the layout accordingly.

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[mainpageStyles.overAll, isDarkMode && mainpageStyles.darkOverAll]}>
        <KeyboardAvoidingView
          style={mainpageStyles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
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
    </TouchableWithoutFeedback>
  );
};

export default MainPage;
