import {View, TextInput} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';

const HistorySearchBar = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: Function;
}) => {
  return (
    <View
      style={{marginBottom: scale(15), marginTop: scale(15)}}
      className="relative ">
      <View
        style={{top: '50%', transform: [{translateY: -10}]}}
        className="absolute  left-4  ">
        <Icon name="magnifying-glass" size={scale(14)} color="white" />
      </View>
      <TextInput
        value={searchText}
        onChangeText={(text: string) => setSearchText(text)}
        style={{fontSize: scale(16), padding: scale(10)}}
        className="bg-gray-500/20  rounded-2xl pl-12 text-white placeholder-slate-200 "
        placeholder="Search"
        placeholderTextColor="gray"
      />
    </View>
  );
};

export default HistorySearchBar;
