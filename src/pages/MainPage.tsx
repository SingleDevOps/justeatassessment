import React, { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useColorScheme, Text, View, Alert, Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { handleSearch } from '../functions/api/apiRequest';
import { mainpageStyles } from '../stylesheets/pages/mainPage';
import { useNetInfo } from '@react-native-community/netinfo';
import { SearchBarComponent } from '../components/SearchBar';
import type { MainPageProps } from '../types/navigation';


const MainPage = ({ navigation }: MainPageProps) => {

  const [postcode, setPostcode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const netInfo = useNetInfo();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(isDarkMode ? '#262626' : 'gray');

    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, isDarkMode]);

  const onSubmit = async (text: string): Promise<void> => {
    const cleaned = text.replaceAll(' ', '').toUpperCase();

    if (!netInfo.isConnected) {
      Alert.alert('No Internet Connection', 'Please check your internet.');
      return;
    }

    setLoading(true);
    const result = await handleSearch(cleaned);
    setLoading(false);

    if (result.ok) {
      navigation.navigate('DisplayPage', { postcode: cleaned, restaurants: result.restaurants });
    } else if (result.reason === 'api_error') {
      Alert.alert('Error fetching restaurant data', 'The Just Eat API Endpoint is down, or your IP address is not European.');
    } else {
      Alert.alert('Invalid Postcode', 'You may have entered the wrong postal code, or it has been terminated.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[mainpageStyles.overAll, isDarkMode && mainpageStyles.darkOverAll]}>
        <KeyboardAvoidingView
          style={mainpageStyles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <View style={[mainpageStyles.container, isDarkMode && mainpageStyles.darkcontainer]}>
            <View>
              <Image
                source={require('../images/just-eat-logo.png')}
                style={mainpageStyles.logo}
              />
            </View>
            <View style={mainpageStyles.searchContainer}>
              <View style={mainpageStyles.twoTexts}>
                <Text style={[mainpageStyles.titleFirstpart, isDarkMode && mainpageStyles.darktitleFirstpart]}>Find Restaurants </Text>
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
