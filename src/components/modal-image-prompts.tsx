import React, {useState} from 'react';
import {TouchableOpacity, TextInput, Text} from 'react-native';
import MyModal from './my-modal';
import {scale} from 'react-native-size-matters';

function ImagePrompModal({
  handleModalSelectImagePromptText,
  setModalVisible,
  modalVisible,
}: {
  handleModalSelectImagePromptText: Function;
  setModalVisible: Function;
  modalVisible: boolean;
}) {
  const [textInputValue, setTextInputValue] = useState('');

  const imagePrompts = [
    'Tell me about the image',
    'solve the promblem in the image',
    'identify the colors on the image',
  ];

  return (
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
  );
}

export default ImagePrompModal;
