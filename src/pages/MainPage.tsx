import React, { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useColorScheme, Text, View, Alert, Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { SearchBarComponent } from '../components/SearchBar';
import { useMainPageViewModel } from '../viewmodels/useMainPageViewModel';
import type { MainPageProps } from '../types/navigation';
import { mainpageStyles } from '../stylesheets/pages/mainPage';

const ERROR_MESSAGES: Record<string, { title: string; message: string }> = {
    no_connection: {
        title: 'No Internet Connection',
        message: 'Please check your internet.',
    },
    api_error: {
        title: 'Error fetching restaurant data',
        message: 'The Just Eat API Endpoint is down, or your IP address is not European.',
    },
    invalid_postcode: {
        title: 'Invalid Postcode',
        message: 'You may have entered the wrong postal code, or it has been terminated.',
    },
};

const MainPage = ({ navigation }: MainPageProps) => {
  const netInfo = useNetInfo();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { postcode, setPostcode, loading, error, dismissError, submit } = useMainPageViewModel({
    navigation,
    isConnected: netInfo.isConnected,
  });

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(isDarkMode ? '#262626' : 'gray');

    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, isDarkMode]);

  useEffect(() => {
    if (!error) return;
    const { title, message } = ERROR_MESSAGES[error];
    Alert.alert(title, message);
    dismissError();
  }, [error, dismissError]);

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
                onSubmit={submit}
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
