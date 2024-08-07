import 'react-native-gesture-handler';
import Payment from './src/pages/payment';
import Home from './src/pages/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import colors from './src/utils/colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from './src/components/sidebar';
import Settings from './src/pages/settings';
import OnBoarding1 from './src/pages/onboarding1';
import OnBoarding2 from './src/pages/onboarding2';
import Login from './src/pages/login';
import React from 'react';
import Loading from './src/pages/loading';
import Store from './src/context/store';
import {AlertNotificationRoot} from 'react-native-alert-notification';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Store>
      <AlertNotificationRoot theme="dark">
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="loading"
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              animation: 'slide_from_right',
            }}>
            <Stack.Screen name="loading" component={Loading} />
            <Stack.Screen name="onboard-1" component={OnBoarding1} />
            <Stack.Screen name="onboard-2" component={OnBoarding2} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen
              name="home"
              options={{
                navigationBarColor: colors.DarkGray,
                headerShown: false,
              }}>
              {() => (
                <Drawer.Navigator
                  drawerContent={props => <SideBar {...props} />}
                  screenOptions={{
                    headerShown: false,
                    drawerType: 'slide',
                    swipeEnabled: false,
                  }}>
                  <Drawer.Screen name="home-stack" component={Home} />
                </Drawer.Navigator>
              )}
            </Stack.Screen>
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
              options={{navigationBarColor: 'black'}}
              component={Settings}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertNotificationRoot>
    </Store>
  );
};

export default App;
