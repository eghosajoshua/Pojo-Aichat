import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {supabase} from '../utils/supabase';

const Loading = ({setUser, navigation}: {setUser: any; navigation: any}) => {
  useEffect(() => {
    const getSession = async () => {
      const {data} = await supabase.auth.getSession();
      if (data.session !== null) {
        //user session exist
        setUser(data.session?.user);
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
