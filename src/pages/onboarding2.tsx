import {View, Text, StatusBar, ScrollView, Image} from 'react-native';
import React from 'react';
import OnBoardBottom from '../components/onboardbottom';

const OnBoarding2 = ({navigation}: any) => {
  return (
    <View>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View className="h-full bg-black">
        <ScrollView
          className="p-5 flex flex-col mt-4 "
          contentContainerStyle={{gap: 20}}>
          <View className="w-full flex flex-col">
            <Text
              style={{alignSelf: 'flex-end'}}
              className="text-slate-50 w-fit max-w-[90%] p-4 text-lg rounded-3xl rounded-tr-none bg-cyan-700 leading-6">
              Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Repellendus ut ipsam, odio consectetur, quidem
              accusamus hic nam provident perferendis quos molestias ullam, quae
              Aperiam?
            </Text>
          </View>
          <View className=" w-full flex flex-col">
            <Text
              style={{alignSelf: 'flex-start'}}
              className="text-slate-200  w-fit  max-w-[90%] p-4 text-lg rounded-3xl rounded-tl-none bg-[#0D0D0D] leading-6">
              Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Repellendus ut ipsam, odio consectetur, quidem
              accusamus hic nam provident perferendis quos molestias ullam, quae
              nulla repellat ipsa deserunt debitis atque minus voluptates enim
              earum iste in eos. Exercitationem corrupti eligendi culpapsam!
              Distinctio accusamus quia necessitatibus, animi at quibusdam ea?
              Aperiam?
            </Text>
          </View>
        </ScrollView>
        <Image
          className="h-20 w-40 m-auto"
          source={require('../../images/sound.gif')}
        />
        <OnBoardBottom
          navigation={navigation}
          onboardscreen={2}
          title="Hear Anything"
        />
      </View>
    </View>
  );
};

export default OnBoarding2;
