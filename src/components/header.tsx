import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Header = ({navigation}: any) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <View
      onLayout={e => {
        let {height} = e.nativeEvent.layout;
        setHeaderHeight(height);
      }}
      className="flex z-10 flex-row bg-[#0D0D0D] relative justify-between items-center p-5 ">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../images/burger.png')}
            className="h-8 w-8"
          />
        </TouchableOpacity>
        <Text className=" text-2xl text-white ml-6">ChatBot</Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsDropdownOpen(prev => !prev)}
        className="px-4">
        <Icon name="ellipsis-vertical" size={24} color="white" />
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
              minWidth: 200,
              gap: 10,
            }}
            className="bg-[#0D0D0D] flex flex-col  p-2 rounded-lg absolute  right-1 ">
            <TouchableOpacity
              onPress={() => navigation.navigate('settings')}
              className="flex flex-row items-center  bg-gray-500/10 p-3 rounded-lg justify-start">
              <Icon name="gear" size={20} color="white" />
              <Text className="text-white ml-3 text-lg  ">Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center  bg-gray-500/10 p-3 rounded-lg justify-start">
              <Icon name="plus" size={24} color="white" />
              <Text className="text-white ml-3 text-lg  ">New Chat</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Header;
