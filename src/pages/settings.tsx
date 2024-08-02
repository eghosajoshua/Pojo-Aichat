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
import Slider from '@react-native-community/slider';
import {ACTIONS} from '../utils/store';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
//@ts-ignore
import Icon5 from 'react-native-vector-icons/FontAwesome5';
//@ts-ignore
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import {supabase} from '../utils/supabase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useContext, useEffect, useState} from 'react';
import {StoreContext} from '../utils/store';
import env from '../utils/env';
import MyModal from '../components/my-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Switch} from 'react-native';
import colors from '../utils/colors';

const regex = /\([a-zA-Z]+\)/g;

const Settings = ({navigation}: {navigation: any}) => {
  const {
    dispatch,
    store: {chatFontSize, autoRead},
  } = useContext(StoreContext) || {store: null};

  GoogleSignin.configure({
    webClientId: env.GOOGLE_WEB_CLIENT_ID,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(autoRead);
  const toggleSwitch = () =>
    setIsEnabled((previousState: any) => !previousState);

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_AUTO_READ,
      payload: isEnabled ? 'true' : 'false',
    });
    AsyncStorage.setItem('autoRead', isEnabled ? 'true' : 'false');
  }, [isEnabled]);

  const {
    store: {user},
  } = useContext(StoreContext) || {store: null};

  const handleSignOut = async () => {
    console.log('sign out');
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

  const handleChangeFontSize = async (val: any) => {
    console.log(val);
    await AsyncStorage.setItem('fontSize', val.toString());
    dispatch({type: ACTIONS.SET_FONT_SIZE, payload: val});
  };

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
              onPress={() => setModalVisible(true)}
              className="flex flex-row items-center p-4 "
              style={{gap: 15}}>
              <Icon name="font" size={24} color="white" />
              <View>
                <Text className="text-white text-lg">Font Size</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleSwitch}
              className="flex flex-row items-center p-4 justify-between">
              <View style={{gap: 15}} className="flex flex-row">
                <Icon6 name="volume-high" size={24} color="white" />
                <View>
                  <Text className="text-white text-lg">Auto Read</Text>
                </View>
              </View>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? colors.LightBlue : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
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
      <MyModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
        <Text className="text-white text-2xl font-bold text-left w-full  mb-6">
          Chat font size <Text>{chatFontSize}</Text>
        </Text>
        <Text className="text-white" style={{fontSize: chatFontSize}}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam,
          molestiae!
        </Text>
        <Slider
          className="w-full"
          style={{height: 80, width: '100%'}}
          minimumValue={15}
          value={chatFontSize}
          maximumValue={25}
          onValueChange={val => {
            handleChangeFontSize(Math.round(val));
          }}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </MyModal>
    </>
  );
};

export default Settings;
