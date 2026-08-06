import React, { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { View, Text, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { SearchBarComponent } from '../components/SearchBar';
import { Logo } from '../components/icons/Logo';
import { ErrorStateView } from '../components/icons/ErrorStateView';
import { useMainPageViewModel, type SearchErrorType } from '../viewmodels/useMainPageViewModel';
import { usePieTheme } from '../hooks/usePieTheme';
import type { MainPageProps } from '../types/navigation';
import { mainpageStyles } from '../stylesheets/pages/mainPage';
import type { PieIllustrationKey } from '../assets/svg/pieIllustrations';

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

const ERROR_ILLUSTRATIONS: Record<SearchErrorType, PieIllustrationKey> = {
    no_connection: 'noConnection',
    api_error: 'apiError',
    invalid_postcode: 'invalidPostcode',
};

const MainPage = ({ navigation }: MainPageProps) => {
  const netInfo = useNetInfo();
  const { theme, isDarkMode } = usePieTheme();
  const { postcode, setPostcode, loading, error, dismissError, submit } = useMainPageViewModel({
    navigation,
    isConnected: netInfo.isConnected,
  });
  const styles = mainpageStyles(theme);

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(isDarkMode ? theme.color.backgroundSubtle : 'gray');

    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, isDarkMode, theme.color.backgroundSubtle]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.overAll}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <View style={styles.container}>
            <View>
              <Logo width="55%" style={styles.logo} />
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.twoTexts}>
                <Text style={styles.titleFirstpart}>Find Restaurants </Text>
                <Text style={styles.titleSecondpart}>Near You</Text>
              </View>
              <SearchBarComponent
                setPostcode={setPostcode}
                loading={loading}
                onSubmit={submit}
                theme={theme}
                postcode={postcode}
              />
            </View>
            {error && (
              <View style={styles.errorStateContainer}>
                <ErrorStateView
                  illustration={ERROR_ILLUSTRATIONS[error]}
                  title={ERROR_MESSAGES[error].title}
                  message={ERROR_MESSAGES[error].message}
                  theme={theme}
                  primaryActionLabel={error === 'invalid_postcode' ? undefined : 'Try again'}
                  onPrimaryAction={error === 'invalid_postcode' ? undefined : () => submit(postcode)}
                  secondaryActionLabel="Dismiss"
                  onSecondaryAction={dismissError}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MainPage;
