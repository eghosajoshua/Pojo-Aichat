import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
//@ts-ignore
import Icon5 from 'react-native-vector-icons/FontAwesome5';

const Settings = ({navigation}: any) => {
  return (
    <View
      className="flex h-full bg-black"
      style={{paddingTop: StatusBar.currentHeight}}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
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
            source={require('../../images/user.jpg')}
            className="rounded-full h-14 w-14"
          />
          <View>
            <Text className="text-white text-xl">Eghosa Joshua</Text>
            <Text className="text-gray-300 text-lg">Eghosajosh@gmail.com</Text>
          </View>
        </View>
        {/* setting list */}
        <View className="flex flex-col px-4" style={{gap: 15}}>
          <TouchableOpacity
            className="flex flex-row items-center p-4"
            style={{gap: 15}}>
            <Icon name="star" size={24} color="white" />
            <View>
              <Text className="text-white text-lg">Subscription</Text>
              <Text className="text-gray-300">Free</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center p-4 "
            style={{gap: 15}}>
            <Icon name="font" size={24} color="white" />
            <View>
              <Text className="text-white text-lg">Font Size</Text>
            </View>
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
  );
};

export default Settings;
