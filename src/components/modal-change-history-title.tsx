import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import MyModal from './my-modal';
import {scale} from 'react-native-size-matters';
import {supabase} from '../utils/supabase';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import React, {useContext} from 'react';

function ChangeTitleModal({
  setModalVisible,
  modalVisible,
  titleEditDetails,
  setTitleEditDetails,
}: {
  setModalVisible: Function;
  modalVisible: boolean;
  titleEditDetails: {id: number; title: string} | null;
  setTitleEditDetails: Function;
}) {
  const {dispatch} = useContext(StoreContext);

  const handleChangeTitle = async (id: any, title: string | undefined) => {
    try {
      const {error} = await supabase
        .from('chat_history')
        .update({title: title})
        .eq('id', id)
        .single();
      if (error === null) {
        dispatch({
          type: CONTEXT_ACTIONS.EDIT_CHAT_HISTORY_TITLE,
          payload: {title: title, id: id},
        });
        setModalVisible(false);
      } else {
        console.error(error, 'nawa');
      }
    } catch (e) {
      console.log('errrr', e);
    }
  };

  return (
    <MyModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <Text
        style={{fontSize: scale(18)}}
        className="text-white font-bold text-left w-full  ">
        Edit Title
      </Text>
      <TextInput
        style={{
          fontSize: scale(15),
          padding: scale(10),
          marginVertical: scale(15),
        }}
        value={titleEditDetails?.title}
        onChangeText={(text: string) =>
          setTitleEditDetails((prev: any) => ({...prev, title: text}))
        }
        className="bg-gray-500/20 rounded-2xl  text-white placeholder-slate-200 w-full"
        placeholder="enter title"
        placeholderTextColor="gray"
      />
      <View style={{gap: 15}} className="flex flex-row  justify-end w-full">
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{gap: 5, padding: scale(5), paddingHorizontal: scale(10)}}
          className="bg-red-100 rounded-xl  flex flex-row justify-center items-center ">
          <Text
            style={{fontSize: scale(12)}}
            className="text-red-600 font-bold">
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleChangeTitle(titleEditDetails?.id, titleEditDetails?.title)
          }
          style={{gap: 5, padding: scale(5), paddingHorizontal: scale(10)}}
          className="bg-green-100 rounded-xl p-1 px-3 flex flex-row justify-center items-center ">
          <Text
            style={{fontSize: scale(12)}}
            className="text-green-800 font-bold">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </MyModal>
  );
}

export default ChangeTitleModal;
