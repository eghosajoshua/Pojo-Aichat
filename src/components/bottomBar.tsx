import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, TextInput, Keyboard} from 'react-native';

//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import IconIon from 'react-native-vector-icons/Ionicons';

function BottomBar({setBottomBarHeight, scrollViewRef}: any) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    setInputValue('');
    Keyboard.dismiss();
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  return (
    <View
      onLayout={e => {
        const {height} = e.nativeEvent.layout;
        setBottomBarHeight(height);
      }}
      style={{gap: 20}}
      className="bg-[#0D0D0D] p-4 flex flex-row justify-between items-center">
      <TouchableOpacity>
        <Icon name="camera" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="image" size={24} color="white" />
      </TouchableOpacity>
      <TextInput
        onChangeText={text => setInputValue(text)}
        value={inputValue}
        onFocus={() => {
          scrollViewRef.current.scrollToEnd({animated: false});
        }}
        keyboardAppearance="dark"
        multiline={true}
        placeholder="Enter message"
        placeholderTextColor="gray"
        className="bg-gray-500/20 p-4 rounded-lg text-white placeholder-slate-200 text-lg max-h-32 flex-1"
      />
      <TouchableOpacity>
        <Icon name="microphone" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit}>
        <IconIon name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default BottomBar;
