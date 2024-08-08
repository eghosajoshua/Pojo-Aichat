import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import CONTEXT_ACTIONS from '../context/actions';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
//@ts-ignore
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import {supabase} from '../utils/supabase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useContext, useDeferredValue, useEffect, useState} from 'react';
import {StoreContext} from '../context/store';
import env from '../utils/env';
import MyModal from '../components/my-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Switch} from 'react-native';
import colors from '../utils/colors';
import rateApp from '../utils/rate';
import {scale} from 'react-native-size-matters';

const regex = /\([a-zA-Z]+\)/g;

const Settings = ({navigation}: {navigation: any}) => {
  const {
    dispatch,
    store: {chatFontSize, autoRead},
  } = useContext(StoreContext);

  const [fontSizeSlider, setFontSizeSlider] = useState(chatFontSize);
  const defferedFontSizeSlider = useDeferredValue(fontSizeSlider);

  GoogleSignin.configure({
    webClientId: env.GOOGLE_WEB_CLIENT_ID,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(autoRead);

  useEffect(() => {
    console.log('useeffect', isEnabled);

    dispatch({
      type: CONTEXT_ACTIONS.SET_AUTO_READ,
      payload: isEnabled ? 'true' : 'false',
    });
    AsyncStorage.setItem('autoRead', isEnabled ? 'true' : 'false');
  }, [isEnabled]);

  const {
    store: {user},
  } = useContext(StoreContext);

  const handleSignOut = async () => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch({
      type: CONTEXT_ACTIONS.SET_FONT_SIZE,
      payload: defferedFontSizeSlider,
    });
    AsyncStorage.setItem('fontSize', defferedFontSizeSlider.toString());
  }, [defferedFontSizeSlider]);

  const settingItems = [
    {
      title: 'Subscription',
      subTitle: 'Free',
      onPress: () => navigation.navigate('payment'),
      icon: 'star',
    },
    {
      title: 'Font Size',
      onPress: () => setModalVisible(true),
      icon: 'font',
    },
    {
      title: 'Clear History',
      onPress: () => {},
      icon: 'history',
    },
    {
      title: 'Contact Us',
      onPress: () => {},
      icon: 'book',
    },
    {
      title: 'Terms of service',
      onPress: () => {},
      icon: 'exclamation-circle',
    },
    {
      title: 'Privacy policy',
      onPress: () => {},
      icon: 'phone',
    },
    {
      title: 'Rate App',
      onPress: () => rateApp(),
      icon: 'star',
    },
    {
      title: 'Log out',
      onPress: () =>
        Alert.alert('Log out', 'Are you sure you want to log out?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => handleSignOut()},
        ]),
      icon: 'sign-out',
    },
  ];

  return (
    <>
      <View
        className="flex h-full bg-black"
        style={{paddingTop: StatusBar.currentHeight}}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor={'black'}
        />
        {/* header */}
        <View
          style={{padding: scale(8), gap: scale(6)}}
          className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="flex flex-row  items-center p-3 py-1"
            style={{gap: 20}}>
            <Icon name="chevron-left" size={scale(18)} color="white" />
            <Text style={{fontSize: scale(18)}} className="text-white">
              Settings
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1 ">
          {/* user */}
          <View className="flex flex-row p-4" style={{gap: 15}}>
            <Image
              style={{
                width: scale(40),
                height: scale(40),
              }}
              source={{
                uri:
                  user?.user_metadata.avatar_url ??
                  'https://lvoohwcdbziczdjtjycq.supabase.co/storage/v1/object/public/images/user.png',
              }}
              className="rounded-full "
            />
            <View className="justify-center">
              <Text style={{fontSize: scale(15)}} className="text-white">
                {user?.user_metadata.name
                  ? user?.user_metadata.name.toString().replace(regex, '')
                  : user.email}
              </Text>
              {user?.user_metadata.name && (
                <Text style={{fontSize: scale(12)}} className="text-gray-400">
                  {user?.email}
                </Text>
              )}
            </View>
          </View>
          {/* setting list */}
          <View className="flex flex-col px-4" style={{gap: 15}}>
            {settingItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{gap: 15}}
                onPress={item.onPress}
                className="flex flex-row items-center p-4 ">
                <Icon
                  name={item.icon}
                  size={scale(18)}
                  color={item.title == 'Log out' ? 'pink' : 'white'}
                />
                <View>
                  <Text
                    style={{
                      fontSize: scale(15),
                      color: item.title == 'Log out' ? 'pink' : 'white',
                    }}
                    className="text-white">
                    {item.title}
                  </Text>
                  {item.subTitle && (
                    <Text
                      style={{fontSize: scale(12)}}
                      className="text-gray-300">
                      {item.subTitle}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <View className="flex flex-row items-center p-4 justify-between">
              <View style={{gap: 15}} className="flex flex-row">
                <Icon6 name="volume-high" size={scale(18)} color="white" />
                <View>
                  <Text style={{fontSize: scale(15)}} className="text-white ">
                    Auto Read
                  </Text>
                </View>
              </View>
              <Switch
                style={{
                  backgroundColor: 'Red',
                }}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? colors.LightBlue : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={val => {
                  console.log(val);

                  setIsEnabled(prev => !prev);
                }}
                value={isEnabled}
              />
            </View>
          </View>
          <View className="py-5"></View>
        </ScrollView>
      </View>

      <MyModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
        <Text className="text-white text-2xl font-bold text-left w-full  mb-6">
          Chat font size <Text>{defferedFontSizeSlider}</Text>
        </Text>
        <Text className="text-white" style={{fontSize: defferedFontSizeSlider}}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam,
          molestiae!
        </Text>
        <Slider
          className="w-full"
          style={{height: 80, width: '100%'}}
          minimumValue={15}
          value={defferedFontSizeSlider}
          maximumValue={25}
          step={1}
          onValueChange={val => {
            setFontSizeSlider(val);
          }}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </MyModal>
    </>
  );
};

export default Settings;
