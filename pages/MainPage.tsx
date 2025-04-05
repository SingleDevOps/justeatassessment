import React, { useEffect } from 'react';
import { Keyboard, useColorScheme, Text, View, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { handleSearch } from '../functions/API_Functions/apiRequest';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { mainpageStyles } from '../stylesheets/MainPage_StyleSheet';


const MainPage = ({ navigation, route }: { navigation: any, route: any }) => {

  const [postcode, setPostcode] = React.useState('');
  const [loading, setLoading] = React.useState(false); // State for showing loading activity
  const [keyboardVisible, setKeyboardVisible] = React.useState(false); //State for keyboard visibility, to adjust the position of the search bar, so it won't be covered by the keyboard.
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark mode).
  const isDarkMode = colorScheme === 'dark'; // Check if the current color scheme is dark mode.
  useEffect(() => {
    SystemNavigationBar.setNavigationColor(isDarkMode ? '#262626' : 'gray'); //Set the color of the system navigation bar to match the theme.
    //Show page title, and header style setting.
    navigation.setOptions({
      headerShow: false,
      title: '', //Empty String for no title
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: isDarkMode ? '#1A1A18' : '#F8F9FA', // Header color based on light mode and dark mode
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

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove(); // Remove the keyboard show listener when the component unmounts.
      keyboardDidHideListener.remove(); // Remove the keyboard hide listener when the component unmounts.
    };
  }, [navigation, route, isDarkMode]);

  const onSubmit = async (text: string) => {    //The "handleSearch" function is imported from 'functions/API_Functions/apiRequest.ts'
    if (!text) { return null; } //If the user submits empty string, return null.
    text = text.replace(/\s/g, '').toUpperCase(); //Strip all spaces for API Calls.
    setLoading(true); // Set loading to true for the activity indicator
    const ten_restaurants = await handleSearch(text); //Ten Restaurants waiting to be returned.
    setLoading(false); // Set loading to false when the loding is finished.
    if (ten_restaurants) {
      navigation.navigate('DisplayPage', { postcode: text, restaurants: ten_restaurants }); //When the ten restaurants data is received, navigate to the DisplayPage and send parameters to the page.
    } else {
      Alert.alert('Invalid postcode', 'This postcode is not a valid UK postcode.');  //If not received, alert the user.
      console.log('Invalid postcode, this postcode is not a valid UK postcode.');
    }
  };



  return (
    // The main page of the app, which contains the search bar and logo.
    // The search bar allows users to enter a UK postcode to find restaurants near this postcode.
    // The logo is displayed at the top of the page.
    // The page also handles keyboard visibility to adjust the layout accordingly.
    // The page is styled based on the current color scheme (light or dark mode).

    <View style={[mainpageStyles.overAll, isDarkMode && mainpageStyles.darkOverAll]}>
      {/*The keyboardAvoidingView to avoid blockage of the searchbar by the keyboard*/}
      <KeyboardAvoidingView
        style={mainpageStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVisible ? 30 : 0} // Adjust the offset based on keyboard visibility
      >
        {/* The MainPage has two parts: the brand logo and the search bar */}
        <View style={[mainpageStyles.container, isDarkMode && mainpageStyles.darkcontainer]}>
          {/************** The logo of Just Eat ***************/}
          <View>
            <Image
              source={require('../images/just-eat-logo.png')} //Self-made Logo of Just Eat Takeaway.com
              style={mainpageStyles.logo}
            />
          </View>
          {/* The search bar contains a title and the search bar */}
          <View style={mainpageStyles.searchContainer}>
            <View style={mainpageStyles.twoTexts}>
              <Text style={[mainpageStyles.titleFirstpart, isDarkMode && mainpageStyles.titleFirstpart]}>Find Restaurants </Text>
              <Text style={[mainpageStyles.titleSecondpart, isDarkMode && mainpageStyles.darktitleSecondpart]}>Near You</Text>
            </View>
            {/***************** The search bar ****************/}
            <SearchBar
              placeholder="Enter an UK Postcode"
              onChangeText={((text: string) => setPostcode(text))}
              value={postcode}
              onSubmitEditing={() => onSubmit(postcode)} // submission handeling

              /* Three mainpageStyles for adjusting how the searchBar looks*/
              containerStyle={[mainpageStyles.searchBarContainer, isDarkMode && mainpageStyles.darksearchBarContainer]}
              inputContainerStyle={[mainpageStyles.searchInputContainer, isDarkMode && mainpageStyles.darksearchInputContainer]}
              inputStyle={[mainpageStyles.searchInput, isDarkMode && mainpageStyles.darksearchInput]}

              placeholderTextColor="#888" // Subtle placeholder color
              searchIcon={null} //Hide searchIcon
              clearIcon={null} //Hide clearIcon
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
