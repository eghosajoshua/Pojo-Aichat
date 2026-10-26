import {
  View,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from '../components/header';
import BottomBar from '../components/bottomBar';
import ChatList from '../components/chat-list';

const Home = ({navigation}: any) => {
  const scrollViewRef = useRef(null);

  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#0D0D0D"
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          className="flex-1 flex flex-col"
          style={{backgroundColor: '#D1D5DB'}}>
          <View style={{marginTop: StatusBar.currentHeight}}></View>
          <Header navigation={navigation} />
          <View className="flex-1 relative">
            <ImageBackground
              className="flex-1"
              source={require('../../images/chat-bg.jpg')}>
              <View className="absolute top-0 left-0 w-full h-full bg-black/50"></View>
              <ChatList scrollViewRef={scrollViewRef} />
            </ImageBackground>
          </View>
          <BottomBar scrollViewRef={scrollViewRef} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Home;
