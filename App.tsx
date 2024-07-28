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
import {supabase} from './src/utils/supabase';
import {AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import {User} from '@supabase/supabase-js';
import Loading from './src/pages/loading';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
    console.log('active');
  } else {
    supabase.auth.stopAutoRefresh();
    console.log('not active');
  }
});

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="loading"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="loading">
          {props => <Loading {...props} setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="onboard-1" component={OnBoarding1} />
        <Stack.Screen name="onboard-2" component={OnBoarding2} />
        <Stack.Screen name="login">
          {props => <Login {...props} setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen
          name="home"
          options={{navigationBarColor: colors.DarkGray, headerShown: false}}>
          {props => <HomeStack {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen
          name="payment"
          component={Payment}
          options={{
            animation: 'slide_from_bottom',
            navigationBarColor: 'black',
          }}
        />
        <Stack.Screen name="settings" options={{navigationBarColor: 'black'}}>
          {props => <Settings {...props} user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = ({user}: {user: User | null}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideBar {...props} user={user} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        swipeEnabled: false,
      }}>
      <Drawer.Screen name="home-stack">
        {props => <Home {...props} user={user} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default App;
