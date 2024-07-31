import React, {useContext, useEffect, useState} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GoogleGenerativeAI} from '@google/generative-ai';
import env from '../utils/env';
import {supabase} from '../utils/supabase';
import {ACTIONS, StoreContext} from '../utils/store';

function BottomBar({setBottomBarHeight, scrollViewRef}: any) {
  const [inputValue, setInputValue] = useState('');
  const [showSendBtn, setShowSendBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const {
    store: {chatData, currentChatId, user},
    dispatch,
  } = useContext(StoreContext) || {store: null};

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
            type: ACTIONS.SET_CURRENT_CHAT_ID,
            payload: data?.id,
          });
          dispatch({
            type: ACTIONS.UPDATE_CHAT_HISTORY,
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
            type: ACTIONS.SET_CHAT_DATA,
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
          type: ACTIONS.SET_CHAT_DATA,
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
    try {
      const generatedContent = await model.generateContent([
        'tell me about this image',
        ...imageParts,
      ]);
      const restText = generatedContent.response.text();
      console.log(generatedContent.response.text());

      const newChatData_ = [
        {role: 'model', parts: [{text: restText}]},
        ...newChatData,
      ];

      dispatch({
        type: ACTIONS.SET_CHAT_DATA,
        payload: newChatData_,
      });
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
      type: ACTIONS.SET_CHAT_DATA,
      payload: newChatData,
    });

    try {
      const chat = model.startChat({
        history: [...history.reverse()],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const responseText = response.text();

      newChatData = [
        {role: 'model', parts: [{text: responseText}]},
        ...newChatData,
      ];
      dispatch({
        type: ACTIONS.SET_CHAT_DATA,
        payload: newChatData,
      });
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
        onLayout={e => {
          const {height} = e.nativeEvent.layout;
          setBottomBarHeight(height);
        }}
        style={{gap: 20}}
        className="bg-[#0D0D0D] p-4 flex flex-row justify-between items-center">
        <TouchableOpacity onPress={handleCameraPick}>
          <Icon name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePick}>
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
    </>
  );
}

export default BottomBar;
