import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from './src/pages/MainPage';
import DisplayPage from './src/pages/DisplayPage';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        // The Navigation Container of the app.
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainPage">
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="DisplayPage" component={DisplayPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
