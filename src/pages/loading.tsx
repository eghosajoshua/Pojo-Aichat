import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {supabase} from '../utils/supabase';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Loading = ({navigation}: {navigation: any}) => {
  const {dispatch} = useContext(StoreContext);

  useEffect(() => {
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
      if (data.session !== null) {
        dispatch({type: CONTEXT_ACTIONS.SET_USER, payload: data.session?.user});
        navigation.navigate('payment');
      } else {
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
