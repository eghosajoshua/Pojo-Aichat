import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import OnBoardBottom from '../components/onboardbottom';

const OnBoarding1 = () => {
  return (
    <View>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View className="h-full bg-black">
        <ScrollView className="bg-green-100">
          <Text className="text-4xl text-black m-auto">1</Text>
        </ScrollView>
        <OnBoardBottom onboardscreen={1} title="Ask Anything" />
      </View>
    </View>
  );
};

export default OnBoarding1;
