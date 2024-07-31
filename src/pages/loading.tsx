import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {supabase} from '../utils/supabase';
import {ACTIONS, StoreContext} from '../utils/store';

const Loading = ({navigation}: {navigation: any}) => {
  const {dispatch} = useContext(StoreContext) || {};

  useEffect(() => {
    const getSession = async () => {
      const {data} = await supabase.auth.getSession();
      if (data.session !== null) {
        //user session exist
        dispatch({type: ACTIONS.SET_USER, payload: data.session?.user});
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
