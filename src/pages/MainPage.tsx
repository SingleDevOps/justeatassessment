import React, { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { View, Text, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { SearchBarComponent } from '../components/SearchBar';
import { Logo } from '../components/icons/Logo';
import { ErrorDialog } from '../components/ErrorDialog';
import { useMainPageViewModel } from '../viewmodels/useMainPageViewModel';
import { usePieTheme } from '../hooks/usePieTheme';
import type { MainPageProps } from '../types/navigation';
import { mainpageStyles } from '../stylesheets/pages/mainPage';

const MainPage = ({ navigation }: MainPageProps) => {
  const netInfo = useNetInfo();
  const { theme, isDarkMode } = usePieTheme();
  const { postcode, setPostcode, loading, error, dismissError, submit } = useMainPageViewModel({
    navigation,
    isConnected: netInfo.isConnected,
  });
  const styles = mainpageStyles(theme);

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(isDarkMode ? theme.color.backgroundDefault : theme.color.containerDefault);

    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, isDarkMode, theme.color.backgroundDefault, theme.color.containerDefault]);

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
          </View>
        </KeyboardAvoidingView>
        <ErrorDialog
          visible={!!error}
          errorType={error}
          onDismiss={dismissError}
          onRetry={() => submit(postcode)}
          theme={theme}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MainPage;
