import 'react-native-gesture-handler';
import Payment from './src/pages/payment';
import Home from './src/pages/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import * as Colors from './src/utils/colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from './src/components/sidebar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Payment"
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen
          name="Home"
          component={HomeStack}
          options={{navigationBarColor: Colors.DarkGray}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            animation: 'slide_from_bottom',
            navigationBarColor: 'black',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <SideBar />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        swipeEnabled: false,
      }}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default App;
