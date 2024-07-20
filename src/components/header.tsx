import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore

const Header = () => {
  return (
    <View className="flex flex-row bg-[#0D0D0D] justify-between items-center p-5 ">
      <View className="flex flex-row items-center">
        <TouchableOpacity>
          <Image
            source={require('../../images/burger.png')}
            className="h-8 w-8"
          />
        </TouchableOpacity>
        <Text className=" text-2xl text-white ml-6">ChatBot</Text>
      </View>
      <TouchableOpacity className="px-4">
        <Icon name="ellipsis-vertical" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
