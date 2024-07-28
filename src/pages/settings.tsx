import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
  Platform,
} from 'react-native';
import React from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
//@ts-ignore
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {User} from '@supabase/supabase-js';
import {supabase} from '../utils/supabase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const regex = /\([a-zA-Z]+\)/g;

const Settings = ({navigation, user}: {navigation: any; user: User | null}) => {
  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    const {error} = await supabase.auth.signOut();
    if (error === null) {
      //sign out
      navigation.navigate('login');
    } else {
      if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
          'something went wrong',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }
  };

  return (
    <View
      className="flex h-full bg-black"
      style={{paddingTop: StatusBar.currentHeight}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={'black'}
      />
      {/* header */}
      <View className=" p-2 flex flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="flex flex-row  items-center p-3 py-1"
          style={{gap: 20}}>
          <Icon name="chevron-left" size={24} color="white" />
          <Text className="text-white text-2xl">Settings</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 ">
        {/* user */}
        <View className="flex flex-row p-4" style={{gap: 15}}>
          <Image
            source={{uri: user?.user_metadata.avatar_url}}
            className="rounded-full h-14 w-14"
          />
          <View>
            <Text className="text-white text-xl">
              {user?.user_metadata.name.toString().replace(regex, '')}
            </Text>
            <Text className="text-gray-300 text-lg">{user?.email}</Text>
          </View>
        </View>
        {/* setting list */}
        <View className="flex flex-col px-4" style={{gap: 15}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('payment')}
            className="flex flex-row items-center p-4"
            style={{gap: 15}}>
            <Icon name="star" size={24} color="white" />
            <View>
              <Text className="text-white text-lg">Subscription</Text>
              <Text className="text-gray-300">Free</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center p-4 "
            style={{gap: 15}}>
            <Icon name="font" size={24} color="white" />
            <View>
              <Text className="text-white text-lg">Font Size</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center p-4 "
            style={{gap: 15}}>
            <Icon name="history" size={24} color="white" />
            <View>
              <Text className="text-white text-lg">Clear History</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center p-4 "
            style={{gap: 15}}>
            <Icon name="phone" size={24} color="white" />
            <View>
              <Text className="text-white text-lg">Contact Us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center p-4 "
            style={{gap: 15}}>
            <Icon5 name="book" size={20} color="white" />
            <View>
              <Text className="text-white text-lg">Terms of service</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center p-4 "
            style={{gap: 15}}>
            <Icon name="exclamation-circle" size={24} color="white" />
            <View>
              <Text className="text-white text-lg">Privacy policy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOut}
            className="flex flex-row items-center p-4 "
            style={{gap: 15}}>
            <Icon name="sign-out" size={24} color="#ff7d7d" />
            <View>
              <Text className="text-[#ff7d7d] text-lg">Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="py-5"></View>
      </ScrollView>
    </View>
  );
};

export default Settings;
