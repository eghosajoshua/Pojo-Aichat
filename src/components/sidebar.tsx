import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import colors from '../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {supabase} from '../utils/supabase';
import {ACTIONS, StoreContext} from '../utils/store';
import MyModal from './my-modal';

const {height: screenHeight} = Dimensions.get('screen');
const {height: windowHeight} = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight || 24;
const bottomBarHeight = screenHeight - windowHeight - statusBarHeight;
const regex = /\([a-zA-Z]+\)/g;

const SideBar = ({navigation}: {navigation: any}) => {
  const [showFavourites, setShowFavourites] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [titleEditDetails, setTitleEditDetails] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const {
    dispatch,
    store: {user, chatHistory},
  } = useContext(StoreContext) || {store: null};

  useEffect(() => {
    const getChatHistory = async () => {
      try {
        if (user !== null) {
          const {data, error} = await supabase
            .from('chat_history')
            .select('title,id,favourite,created_at')
            .eq('user_id', user.id);
          if (error === null) {
            // setChatHistory(data);

            dispatch({type: ACTIONS.SET_CHAT_HISTORY, payload: data});
          }
        } else {
          console.log('user is null');
        }
      } catch (e) {
        console.error('chat history error');
      }
    };
    getChatHistory();
  }, [user]);

  const handleSelectChat = async (id: number) => {
    try {
      const {data, error} = await supabase
        .from('chat_history')
        .select('chats')
        .eq('id', id)
        .single();
      if (error === null) {
        dispatch({type: ACTIONS.SET_CURRENT_CHAT_ID, payload: id});
        dispatch({type: ACTIONS.SET_CHAT_DATA, payload: data.chats});
      } else {
        console.error(error, 'nawa');
      }
    } catch (e) {
      console.log('errrr', e);
    }
    setSearchText('');
    navigation.closeDrawer();
  };

  const handleFavourite = async (id: any, favourite: Boolean) => {
    try {
      const {error} = await supabase
        .from('chat_history')
        .update({favourite: !favourite})
        .eq('id', id)
        .single();
      if (error === null) {
        dispatch({
          type: ACTIONS.EDIT_CHAT_HISTORY_FAVOURITE,
          payload: {favourite: !favourite, id: id},
        });
      } else {
        console.error(error, 'nawa');
      }
    } catch (e) {
      console.log('errrr', e);
    }
  };

  const handleChangeTitle = async (id: any, title: string | undefined) => {
    try {
      const {error} = await supabase
        .from('chat_history')
        .update({title: title})
        .eq('id', id)
        .single();
      if (error === null) {
        dispatch({
          type: ACTIONS.EDIT_CHAT_HISTORY_TITLE,
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

  const handleChangeTitleOpenModal = async (id: any, title: string) => {
    setModalVisible(true);
    setTitleEditDetails({id, title});
  };

  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: colors.DarkGray,
      }}
      className="h-full w-full flex flex-col p-4 ">
      <Text className="text-2xl text-white ">History</Text>
      <View className="relative my-4">
        <View
          style={{top: '50%', transform: [{translateY: -10}]}}
          className="absolute  left-4  ">
          <Icon name="magnifying-glass" size={20} color="white" />
        </View>
        <TextInput
          value={searchText}
          onChangeText={(text: string) => setSearchText(text)}
          className="bg-gray-500/20 p-4 rounded-2xl pl-12 text-white placeholder-slate-200 text-lg "
          placeholder="Search"
          placeholderTextColor="gray"
        />
      </View>
      {/* hr */}
      <View className="bg-gray-500/70 rounded-full h-1 mb-4"></View>
      {/* Favourites */}
      <View className="mb-4 ">
        <TouchableOpacity
          onPress={() => setShowFavourites(prev => !prev)}
          className="mb-2 flex flex-row justify-between items-center">
          <Text className="text-white text-xl">Favourites</Text>
          {!showFavourites ? (
            <Icon name="chevron-right" size={20} color="white" />
          ) : (
            <Icon name="chevron-down" size={20} color="white" />
          )}
        </TouchableOpacity>
        {showFavourites && (
          <ScrollView
            contentContainerStyle={{gap: 20}}
            className="mt-2  flex flex-col max-h-52 ">
            {/* list */}
            {chatHistory
              .filter(
                (history: any) =>
                  history.title
                    .toLowerCase()
                    .indexOf(searchText.toLowerCase()) !== -1,
              )
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime(),
              )
              .map((history: any) => {
                if (history.favourite) {
                  return (
                    <View
                      key={history.id}
                      className="flex flex-row gap-5  items-center">
                      <TouchableOpacity
                        className="p-1"
                        onPress={() =>
                          handleFavourite(history.id, history.favourite)
                        }>
                        <Icon2 name="heart" size={18} color="pink" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSelectChat(history.id)}
                        className="flex-1">
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          className="text-white text-lg ">
                          {history.title}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          handleChangeTitleOpenModal(history.id, history.title)
                        }
                        className=" p-1 ">
                        <Icon name="pen" size={18} color="gray" />
                      </TouchableOpacity>
                    </View>
                  );
                }
              })}
          </ScrollView>
        )}
      </View>
      {/* hr */}
      <View className="bg-gray-500/70 rounded-full h-1 mb-4"></View>
      {/* history */}
      <ScrollView
        contentContainerStyle={{display: 'flex', gap: 20}}
        className="flex-1 mb-4">
        {chatHistory
          .filter(
            (history: any) =>
              history.title.toLowerCase().indexOf(searchText.toLowerCase()) !==
              -1,
          )
          .sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )

          .map((history: any) => {
            if (!history.favourite) {
              return (
                <View
                  key={history.id}
                  className="flex flex-row gap-5  items-center">
                  <TouchableOpacity
                    className="p-1"
                    onPress={() =>
                      handleFavourite(history.id, history.favourite)
                    }>
                    <Icon2 name="heart-o" size={18} color="gray" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSelectChat(history.id)}
                    className="flex-1">
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="text-white text-lg ">
                      {history.title}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      handleChangeTitleOpenModal(history.id, history.title)
                    }
                    className=" p-1 ">
                    <Icon name="pen" size={18} color="gray" />
                  </TouchableOpacity>
                </View>
              );
            }
          })}
      </ScrollView>
      {/* hr */}
      <View className="bg-gray-500/70 rounded-full h-1 mb-4"></View>
      <TouchableOpacity
        onPress={() => navigation.navigate('settings')}
        style={{marginBottom: bottomBarHeight + 30}}
        className="my-4 w-full  flex flex-row justify-between items-center">
        <View className="flex flex-row mr-4 gap-4 flex-1 overflow-hidden items-center">
          <Image
            className="h-10 w-10 rounded-full"
            source={{uri: user?.user_metadata.avatar_url}}
          />
          <Text numberOfLines={1} className="text-white   text-xl flex-1   ">
            {user?.user_metadata.name.replace(regex, '')}
          </Text>
        </View>
        <Icon name="chevron-right" size={20} color="white" />
      </TouchableOpacity>
      <MyModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
        <Text className="text-white text-2xl font-bold text-left w-full  ">
          Edit Title
        </Text>
        <TextInput
          value={titleEditDetails?.title}
          onChangeText={(text: string) =>
            setTitleEditDetails((prev: any) => ({...prev, title: text}))
          }
          className="bg-gray-500/20 p-4 rounded-2xl my-4 text-white placeholder-slate-200 text-lg w-full"
          placeholder="enter title"
          placeholderTextColor="gray"
        />
        <View style={{gap: 15}} className="flex flex-row  justify-end w-full">
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{gap: 5}}
            className="bg-red-100 rounded-xl p-1 px-3 flex flex-row justify-center items-center ">
            <Text className="text-red-600 font-bold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleChangeTitle(titleEditDetails?.id, titleEditDetails?.title)
            }
            style={{gap: 5}}
            className="bg-green-100 rounded-xl p-1 px-3 flex flex-row justify-center items-center ">
            <Text className="text-green-800 font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </MyModal>
    </View>
  );
};

export default SideBar;
