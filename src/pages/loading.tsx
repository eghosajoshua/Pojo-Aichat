import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {supabase} from '../utils/supabase';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Loading = ({navigation}: {navigation: any}) => {
  const {dispatch} = useContext(StoreContext);

  useEffect(() => {
    console.log('loading');

    const setFontSize = async () => {
      const fontSize = await AsyncStorage.getItem('fontSize');
      if (fontSize) {
        dispatch({
          type: CONTEXT_ACTIONS.SET_FONT_SIZE,
          payload: parseInt(fontSize),
        });
      }
      const autoRead = await AsyncStorage.getItem('autoRead');
      console.log(autoRead, 'read');
      if (autoRead) {
        dispatch({
          type: CONTEXT_ACTIONS.SET_AUTO_READ,
          payload: autoRead === 'true',
        });
      }
    };
    setFontSize();

    const getSession = async () => {
      const {data} = await supabase.auth.getSession();
      console.log(data.session?.user, 'loading screen');

      if (data.session !== null) {
        //user session exist
        dispatch({type: CONTEXT_ACTIONS.SET_USER, payload: data.session?.user});
        navigation.navigate('home');
      } else {
        //user session does not exit
        navigation.navigate('login');
      }
    };
    getSession();
  }, []);

  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default Loading;
