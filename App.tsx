import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import MainPage from './src/pages/MainPage';
import DisplayPage from './src/pages/DisplayPage';
import RestaurantDetailPage from './src/pages/RestaurantDetailPage';
import { usePieTheme } from './src/hooks/usePieTheme';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    const { theme, isDarkMode } = usePieTheme();

    return (
        // The Navigation Container of the app.
        <NavigationContainer>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? theme.color.backgroundDefault : theme.color.containerDefault}
            />
            <Stack.Navigator initialRouteName="MainPage">
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="DisplayPage" component={DisplayPage} />
                <Stack.Screen name="RestaurantDetailPage" component={RestaurantDetailPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
