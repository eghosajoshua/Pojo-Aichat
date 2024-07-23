import {View, Text, StatusBar, ScrollView} from 'react-native';
import React from 'react';
import OnBoardBottom from '../components/onboardbottom';

const OnBoarding3 = ({navigation}: any) => {
  return (
    <View>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View className="h-full bg-black">
        <ScrollView className="">
          <Text className="text-4xl text-black m-auto">3</Text>
        </ScrollView>
        <OnBoardBottom
          navigation={navigation}
          onboardscreen={3}
          title="See Everything"
        />
      </View>
    </View>
  );
};

export default OnBoarding3;
