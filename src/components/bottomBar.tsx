import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  ToastAndroid,
} from 'react-native';
import Voice from '@react-native-voice/voice';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import IconIon from 'react-native-vector-icons/Ionicons';

function BottomBar({setBottomBarHeight, scrollViewRef, setChatData}: any) {
  const [inputValue, setInputValue] = useState('');
  const [showSendBtn, setShowSendBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    setInputValue('');
    setShowSendBtn(false);
    scrollViewRef.current.scrollToIndex({index: 0, animated: true});
    setChatData((prev: any) => [
      {
        role: 'user',
        message: inputValue.trim(),
      },
      ...prev,
    ]);
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    if (text.trim() !== '') {
      setShowSendBtn(true);
    } else {
      setShowSendBtn(false);
    }
  };

  const handleVoiceStart = async () => {
    try {
      await Voice.start('en-GB');
    } catch (error) {
      if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
          'could not start voice recognition',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }
  };

  const handleVoiceStop = async () => {
    setIsRecording(false);
    try {
      await Voice.stop();
    } catch (error) {
      if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
          'something went wrong',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }
  };

  useEffect(() => {
    Voice.onSpeechEnd = event => {
      setIsRecording(false);
    };

    Voice.onSpeechStart = event => {
      setIsRecording(true);
    };

    Voice.onSpeechResults = event => {
      const value = event.value;
      if (value && value.length > 0) {
        setInputValue(value[0]);
        setShowSendBtn(true);
      }
    };

    Voice.onSpeechError = event => {
      setIsRecording(false);
      if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
          'could not generate speech',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    };

    return () => {
      Voice.destroy().then(() => {});
    };
  }, []);

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
        onChangeText={handleChangeText}
        value={inputValue}
        keyboardAppearance="dark"
        multiline={true}
        placeholder="Enter message"
        placeholderTextColor="gray"
        className="bg-gray-500/20 p-4 rounded-lg text-white placeholder-slate-200 text-lg max-h-32 flex-1"
      />
      {!showSendBtn ? (
        !isRecording ? (
          <TouchableOpacity onPress={handleVoiceStart}>
            <Icon name="microphone" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleVoiceStop}>
            <Icon name="stop" size={24} color="red" />
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity onPress={handleSubmit}>
          <IconIon name="send" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default BottomBar;
