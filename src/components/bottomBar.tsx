import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  ToastAndroid,
  Text,
} from 'react-native';
import Voice from '@react-native-voice/voice';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import IconIon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GoogleGenerativeAI} from '@google/generative-ai';
import env from '../utils/env';
import {supabase} from '../utils/supabase';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import MyModal from './my-modal';
import Tts from 'react-native-tts';
import {scale} from 'react-native-size-matters';

function BottomBar({scrollViewRef}: any) {
  const [inputValue, setInputValue] = useState('');
  const [showSendBtn, setShowSendBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [imageData, setImageData] = useState([]);
  const modalRef = useRef(null);
  const imagePrompts = [
    'Tell me about the image',
    'solve the promblem in the image',
    'identify the colors on the image',
  ];

  const {
    store: {chatData, currentChatId, user, autoRead},
    dispatch,
  } = useContext(StoreContext);

  const genAi = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const model = genAi.getGenerativeModel({model: 'gemini-1.5-flash'});

  //update chatDb
  useEffect(() => {
    const uploadChatData = async () => {
      if (chatData.length == 0) return;
      let chatTitle = chatData[chatData.length - 1].parts[0].text.substring(
        0,
        15,
      );
      try {
        if (currentChatId === null) {
          //create new chat history
          const {data} = await supabase
            .from('chat_history')
            .insert({
              user_id: user.id,
              chats: chatData,
              title: chatTitle,
            })
            .select('id')
            .single();

          dispatch({
            type: CONTEXT_ACTIONS.SET_CURRENT_CHAT_ID,
            payload: data?.id,
          });
          dispatch({
            type: CONTEXT_ACTIONS.UPDATE_CHAT_HISTORY,
            payload: {favourite: false, id: data?.id, title: chatTitle},
          });
        } else {
          //update chat history
          const {error} = await supabase
            .from('chat_history')
            .update({
              chats: chatData,
            })
            .eq('id', currentChatId);
        }
      } catch (e) {
        // console.error('failed to upload chat', e);
      }
    };
    uploadChatData();
  }, [chatData]);

  const handleImagePick = () => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: true},
      (response: any) => {
        if (response.assets && response.assets.length > 0) {
          const {uri, base64, type} = response.assets[0];

          let newChatData = [{role: 'user', parts: [{text: uri}]}, ...chatData];

          dispatch({
            type: CONTEXT_ACTIONS.SET_CHAT_DATA,
            payload: newChatData,
          });

          ImagePrompt(
            [
              {
                inlineData: {
                  data: base64,
                  mimeType: type,
                },
              },
            ],
            newChatData,
          );
        }
      },
    );
  };

  const handleCameraPick = () => {
    launchCamera({mediaType: 'photo', includeBase64: true}, (response: any) => {
      if (response.assets && response.assets.length > 0) {
        const {uri, base64, type} = response.assets[0];
        // setUploadedImageUri(prev => [...prev, uri]);

        const newChatData = [{role: 'user', parts: [{text: uri}]}, ...chatData];

        dispatch({
          type: CONTEXT_ACTIONS.SET_CHAT_DATA,
          payload: newChatData,
        });

        ImagePrompt(
          [
            {
              inlineData: {
                data: base64,
                mimeType: type,
              },
            },
          ],
          newChatData,
        );
      }
    });
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
      if (autoRead) Tts.speak(restText);
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

      console.log('autoREad', autoRead);
      newChatData = [
        {role: 'model', parts: [{text: responseText}]},
        ...newChatData,
      ];
      dispatch({
        type: CONTEXT_ACTIONS.SET_CHAT_DATA,
        payload: newChatData,
      });
      if (autoRead) Tts.speak(responseText);
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

  //speech events
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
      Voice.destroy().then(() => {
        Voice.removeAllListeners();
      });
    };
  }, []);

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
      <MyModal
        dismissible={false}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}>
        <Text
          style={{fontSize: scale(15), marginBottom: scale(10)}}
          className="text-white  font-bold text-left w-full">
          Image prompt
        </Text>
        {imagePrompts.map((prompt, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleModalSelectImagePromptText(prompt)}
            style={{marginTop: scale(8), padding: scale(10)}}
            className="bg-black w-full rounded-lg">
            <Text style={{fontSize: scale(12)}} className="text-white">
              {prompt}
            </Text>
          </TouchableOpacity>
        ))}
        <TextInput
          ref={modalRef}
          onChangeText={(text: string) => {
            setTextInputValue(text);
          }}
          onSubmitEditing={() => {
            handleModalSelectImagePromptText(textInputValue);
          }}
          style={{
            padding: scale(8),
            fontSize: scale(12),
            marginTop: scale(10),
          }}
          className="bg-gray-500/20 rounded-xl text-white placeholder-slate-200  w-full"
          placeholder="enter custom prompt"
          placeholderTextColor="gray"
        />
      </MyModal>
    </>
  );
}

export default BottomBar;
