import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const DEMO_MESSAGE_LIMIT = 20;

const getLocalDateKey = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

const consumeDemoMessage = async (userId: string) => {
  const storageKey = `gemini-message-usage:${encodeURIComponent(userId)}`;
  const today = getLocalDateKey();
  const storedValue = await AsyncStorage.getItem(storageKey);
  const usage = storedValue ? JSON.parse(storedValue) : null;
  const used = usage?.date === today ? Number(usage.count) || 0 : 0;

  if (used >= DEMO_MESSAGE_LIMIT) return false;

  await AsyncStorage.setItem(
    storageKey,
    JSON.stringify({date: today, count: used + 1}),
  );
  return true;
};

const logGeminiError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  const apiKey = env.GEMINI_API_KEY;
  console.error(
    'Gemini request failed:',
    apiKey ? message.split(apiKey).join('[REDACTED]') : message,
  );
};

const withGeminiRetry = async <T,>(request: () => Promise<T>): Promise<T> => {
  for (let attempt = 0; ; attempt++) {
    try {
      return await request();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isTransient = /\b(429|5\d\d)\b/.test(message);
      if (!isTransient || attempt >= 3) throw error;

      await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
    }
  }
};

//note

function BottomBar({scrollViewRef}: any) {
  const [inputValue, setInputValue] = useState('');
  const [showSendBtn, setShowSendBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [imageData, setImageData] = useState([]);
  const requestInProgress = useRef(false);

  const {
    store: {chatData, currentChatId, user, autoRead},
    dispatch,
  } = useContext(StoreContext);

  const beginGeminiRequest = async () => {
    if (requestInProgress.current) return false;
    requestInProgress.current = true;

    try {
      const allowed = await consumeDemoMessage(user?.id ?? 'anonymous');
      if (!allowed) {
        Alert.alert(
          'Daily demo limit reached',
          `You can send ${DEMO_MESSAGE_LIMIT} messages per day. Try again tomorrow.`,
        );
        requestInProgress.current = false;
      }
      return allowed;
    } catch (error) {
      requestInProgress.current = false;
      logGeminiError(error);
      Alert.alert('Unable to check message limit', 'Please try again.');
      return false;
    }
  };

  const getModel = () => {
    if (!env.GEMINI_API_KEY) {
      Alert.alert(
        'Gemini API key missing',
        'Add EXPO_PUBLIC_GEMINI_API_KEY to your local .env file and restart Expo.',
      );
      return null;
    }

    return new GoogleGenerativeAI(env.GEMINI_API_KEY).getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
    });
  };

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
    const model = getModel();
    if (!model) return;
    if (!(await beginGeminiRequest())) return;
    setModalVisible(false);

    let newChatData_ = [{role: 'user', parts: [{text: text}]}, ...chatData];
    dispatch({
      type: CONTEXT_ACTIONS.SET_CHAT_DATA,
      payload: newChatData_,
    });

    try {
      const generatedContent = await withGeminiRetry(() =>
        model.generateContent([text, ...imageData]),
      );
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
      logGeminiError(e);
    } finally {
      requestInProgress.current = false;
    }
  };

  const handleSubmit = async () => {
    const message = inputValue.trim();
    if (!message) return;

    const model = getModel();
    if (!model) return;
    if (!(await beginGeminiRequest())) return;

    let history = [];
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

      const result = await withGeminiRetry(() => chat.sendMessage(message));
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
      logGeminiError(e);
    } finally {
      requestInProgress.current = false;
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
