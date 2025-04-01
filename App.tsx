import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from './MainPage';
import DisplayPage from './DisplayPage';
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="MainPage">
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="DisplayPage" component={DisplayPage} />
        </Stack.Navigator>
        </NavigationContainer>
    );
    };
export default App;
