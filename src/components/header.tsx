import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Share,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {ACTIONS, StoreContext} from '../utils/store';
import {scale} from 'react-native-size-matters';
//@ts-ignore

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Header = ({navigation, headerHeight, setHeaderHeight}: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleLayout = useCallback((e: any) => {
    let {height} = e.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  const {dispatch} = useContext(StoreContext) || {};

  return (
    <View
      onLayout={handleLayout}
      style={{padding: scale(15)}}
      className="flex z-10 flex-row bg-[#0D0D0D] relative justify-between items-center">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{height: scale(20), width: scale(20)}}
            source={require('../../images/burger.png')}
          />
        </TouchableOpacity>
        <Text style={{fontSize: scale(20)}} className=" text-white ml-6">
          ChatBot
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsDropdownOpen(prev => !prev)}
        className="px-4">
        <Icon name="ellipsis-vertical" size={scale(20)} color="white" />
      </TouchableOpacity>
      {/* dropdown */}
      {isDropdownOpen && (
        <>
          <Pressable
            onPress={() => setIsDropdownOpen(false)}
            style={{width: screenWidth, height: screenHeight}}
            className=" absolute top-0 left-0"></Pressable>
          <View
            style={{
              top: headerHeight + 1,
              minWidth: scale(150),
              gap: scale(8),
            }}
            className="bg-[#0D0D0D] flex flex-col  p-2 rounded-lg absolute  right-1 ">
            <TouchableOpacity
              onPress={() => navigation.navigate('settings')}
              style={{padding: scale(8)}}
              className="flex flex-row items-center  bg-gray-500/5 rounded-lg justify-start">
              <Icon name="gear" size={scale(17)} color="white" />
              <Text style={{fontSize: scale(15)}} className="text-white ml-3  ">
                Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch({type: ACTIONS.SET_CURRENT_CHAT_ID, payload: null});
                dispatch({type: ACTIONS.SET_CHAT_DATA, payload: []});
                setIsDropdownOpen(false);
              }}
              style={{padding: scale(8)}}
              className="flex flex-row items-center  bg-gray-500/5 rounded-lg justify-start">
              <Icon name="plus" size={scale(20)} color="white" />
              <Text style={{fontSize: scale(15)}} className="text-white ml-3 ">
                New Chat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  message:
                    'Check out this app Pojo AI Chatbot - https://play.google.com/store/apps/details?id=com.pojoai.aichat',
                  url: 'https://play.google.com/store/apps/details?id=com.pojoai.aichat',
                });
              }}
              style={{padding: scale(8)}}
              className="flex flex-row items-center  bg-gray-500/5 rounded-lg justify-start">
              <Icon name="share" size={scale(18)} color="white" />
              <Text style={{fontSize: scale(15)}} className="text-white ml-3 ">
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Header;
