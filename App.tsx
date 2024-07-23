import 'react-native-gesture-handler';
import Payment from './src/pages/payment';
import Home from './src/pages/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import * as Colors from './src/utils/colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from './src/components/sidebar';
import Settings from './src/pages/settings';
import OnBoarding1 from './src/pages/onboarding1';
import OnBoarding2 from './src/pages/onboarding2';
import OnBoarding3 from './src/pages/onboarding3';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="onboard-1"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="onboard-1" component={OnBoarding1} />
        <Stack.Screen name="onboard-2" component={OnBoarding2} />
        <Stack.Screen name="onboard-3" component={OnBoarding3} />
        <Stack.Screen
          name="home"
          component={HomeStack}
          options={{navigationBarColor: Colors.DarkGray}}
        />
        <Stack.Screen
          name="payment"
          component={Payment}
          options={{
            animation: 'slide_from_bottom',
            navigationBarColor: 'black',
          }}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={{navigationBarColor: 'black'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideBar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        swipeEnabled: false,
      }}>
      <Drawer.Screen name="home-stack" component={Home} />
    </Drawer.Navigator>
  );
};

export default App;
