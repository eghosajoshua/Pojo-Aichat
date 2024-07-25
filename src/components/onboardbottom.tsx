import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const OnBoardBottom = ({
  onboardscreen = 1,
  title,
  navigation,
}: {
  onboardscreen: number;
  title: String;
  navigation: any;
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
        <TouchableOpacity
          onPress={() => {
            if (onboardscreen === 3) {
              navigation.navigate('payment');
            } else if (onboardscreen === 2) {
              navigation.navigate('onboard-3');
            } else if (onboardscreen === 1) {
              navigation.navigate('onboard-2');
            }
          }}>
          <LinearGradient
            start={{x: 0.5, y: 0.25}}
            end={{x: 0.5, y: 1.0}}
            colors={[colors.LightBlue, colors.DarkBlue]}
            className="p-4 rounded-lg">
            <Text className="text-center font-semibold text-xl text-black">
              Continue
            </Text>
          </LinearGradient>
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
