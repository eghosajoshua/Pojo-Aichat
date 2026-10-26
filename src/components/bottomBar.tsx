import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  ToastAndroid,
} from 'react-native';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import IconIon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import {GoogleGenerativeAI} from '@google/generative-ai';
import env from '../utils/env';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import * as Speech from 'expo-speech';
import {scale} from 'react-native-size-matters';
import ImagePrompModal from './modal-image-prompts';

//note

function BottomBar({scrollViewRef}: any) {
  const [inputValue, setInputValue] = useState('');
  const [showSendBtn, setShowSendBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [imageData, setImageData] = useState([]);

  const {
    store: {chatData, currentChatId, user, autoRead},
    dispatch,
  } = useContext(StoreContext);

  const genAi = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const model = genAi.getGenerativeModel({model: 'gemini-1.5-flash'});

  useEffect(() => {
    if (chatData.length === 0) return;
    const title = chatData[chatData.length - 1].parts[0].text.substring(0, 15);
    if (currentChatId === null) {
      const id = Date.now();
      dispatch({type: CONTEXT_ACTIONS.SET_CURRENT_CHAT_ID, payload: id});
      dispatch({
        type: CONTEXT_ACTIONS.UPDATE_CHAT_HISTORY,
        payload: {
          id,
          title,
          favourite: false,
          created_at: new Date().toISOString(),
          chats: chatData,
        },
      });
    } else {
      dispatch({
        type: CONTEXT_ACTIONS.EDIT_CHAT_HISTORY_TITLE,
        payload: {id: currentChatId, title, chats: chatData},
      });
    }
  }, [chatData]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      const {uri, base64, mimeType} = result.assets[0];
      const newChatData = [{role: 'user', parts: [{text: uri}]}, ...chatData];
      dispatch({type: CONTEXT_ACTIONS.SET_CHAT_DATA, payload: newChatData});
      ImagePrompt(
        [{inlineData: {data: base64, mimeType: mimeType || 'image/jpeg'}}],
        newChatData,
      );
    }
  };

  const handleCameraPick = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({base64: true});
    if (!result.canceled && result.assets[0]) {
      const {uri, base64, mimeType} = result.assets[0];
      const newChatData = [{role: 'user', parts: [{text: uri}]}, ...chatData];
      dispatch({type: CONTEXT_ACTIONS.SET_CHAT_DATA, payload: newChatData});
      ImagePrompt(
        [{inlineData: {data: base64, mimeType: mimeType || 'image/jpeg'}}],
        newChatData,
      );
    }
  };

  const ImagePrompt = async (imageParts: any, newChatData: any) => {
    setImageData(prev => imageParts);
    setModalVisible(true);
  };

  const handleModalSelectImagePromptText = async (text: string) => {
    setModalVisible(false);
    let newChatData_ = [{role: 'user', parts: [{text: text}]}, ...chatData];
    dispatch({
      type: CONTEXT_ACTIONS.SET_CHAT_DATA,
      payload: newChatData_,
    });

    try {
      const generatedContent = await model.generateContent([
        text,
        ...imageData,
      ]);
      const restText = generatedContent.response.text();
      newChatData_ = [
        {role: 'model', parts: [{text: restText}]},
        ...newChatData_,
      ];

      dispatch({
        type: CONTEXT_ACTIONS.SET_CHAT_DATA,
        payload: newChatData_,
      });
      if (autoRead) Speech.speak(restText);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async () => {
    let history = [];
    let message = inputValue.trim();
    setInputValue('');
    setShowSendBtn(false);
    chatData.length > 0 &&
      scrollViewRef.current.scrollToIndex({index: 0, animated: true});
    history = [...chatData];

    let newChatData = [{role: 'user', parts: [{text: message}]}, ...chatData];
    dispatch({
      type: CONTEXT_ACTIONS.SET_CHAT_DATA,
      payload: newChatData,
    });

    try {
      const chat = model.startChat({
        history: [...history.reverse()],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const responseText = response.text();

      console.log('autoREad  sent __', autoRead);
      newChatData = [
        {role: 'model', parts: [{text: responseText}]},
        ...newChatData,
      ];
      dispatch({
        type: CONTEXT_ACTIONS.SET_CHAT_DATA,
        payload: newChatData,
      });
      if (autoRead) {
        Speech.speak(responseText);
        console.log('speak', typeof autoRead);
      }
    } catch (e) {
      console.error('Something went wrong', e);
    }

    setLoadingResponse(false);
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    if (text.trim() !== '') {
      setShowSendBtn(true);
    } else {
      setShowSendBtn(false);
    }
  };

  const handleVoiceStart = () => {
    setIsRecording(true);
  };

  const handleVoiceStop = () => {
    setIsRecording(false);
  };

  return (
    <>
      <View
        style={{
          gap: scale(20),
          padding: scale(10),
          paddingHorizontal: scale(20),
        }}
        className="bg-[#0D0D0D] flex flex-row justify-between items-center">
        <TouchableOpacity onPress={handleCameraPick}>
          <Icon name="camera" size={scale(20)} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePick}>
          <Icon name="image" size={scale(20)} color="white" />
        </TouchableOpacity>
        <TextInput
          onChangeText={handleChangeText}
          value={inputValue}
          keyboardAppearance="dark"
          multiline={true}
          style={{
            padding: scale(8),
            maxHeight: scale(70),
            fontSize: scale(12),
            color: 'white',
          }}
          placeholder="Enter message"
          placeholderTextColor="gray"
          className="bg-gray-500/20 rounded-lg text-white placeholder-slate-200 flex-1"
        />
        {!showSendBtn ? (
          !isRecording ? (
            <TouchableOpacity onPress={handleVoiceStart}>
              <Icon name="microphone" size={scale(20)} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleVoiceStop}>
              <Icon name="stop" size={scale(20)} color="red" />
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity onPress={handleSubmit}>
            <IconIon name="send" size={scale(20)} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <ImagePrompModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        handleModalSelectImagePromptText={handleModalSelectImagePromptText}
      />
    </>
  );
}

export default BottomBar;
