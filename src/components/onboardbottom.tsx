import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const OnBoardBottom = ({
  onboardscreen = 1,
  title,
}: {
  onboardscreen: number;
  title: String;
}) => {
  return (
    <View className="p-8">
      <View className="mb-10">
        {onboardscreen === 1 && (
          <Text className="text-gray-200 text-2xl mb-2">Welcome</Text>
        )}
        <Text className="text-5xl text-white font-bold">{title}</Text>
      </View>
      <View>
        <View
          className="mx-auto mb-4 flex flex-row items-center"
          style={{gap: 10}}>
          {onboardscreen == 1 && (
            <View className="w-10 h-2 bg-white rounded-full"></View>
          )}
          <View className="bg-white w-3 h-2 rounded-full"></View>
          {onboardscreen == 2 && (
            <View className="w-10 h-2 bg-white rounded-full"></View>
          )}
          <View className="bg-white w-3 h-2 rounded-full"></View>
          {onboardscreen == 3 && (
            <View className="w-10 h-2 bg-white rounded-full"></View>
          )}
        </View>
        <TouchableOpacity className="bg-cyan-600 p-4 rounded-lg">
          <Text className="text-center font-extrabold text-xl text-white">
            Continue
          </Text>
        </TouchableOpacity>
        <Text
          className="text-white text-xs  text-center my-2 "
          style={onboardscreen !== 1 && {opacity: 0}}>
          By continuing you comply to our{' '}
          <Text className="text-cyan-300 text-xs">privacy policy</Text> and{' '}
          <Text className="text-cyan-300 text-xs">terms of service</Text>
        </Text>
      </View>
    </View>
  );
};

export default OnBoardBottom;
