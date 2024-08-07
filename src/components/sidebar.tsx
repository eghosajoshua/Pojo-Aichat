import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import colors from '../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {supabase} from '../utils/supabase';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import MyModal from './my-modal';
import Popover from 'react-native-popover-view/dist/Popover';
import {PopoverPlacement} from 'react-native-popover-view';
import {scale} from 'react-native-size-matters';

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

  console.log(chatHistory);

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

            dispatch({type: CONTEXT_ACTIONS.SET_CHAT_HISTORY, payload: data});
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
        dispatch({type: CONTEXT_ACTIONS.SET_CURRENT_CHAT_ID, payload: id});
        dispatch({type: CONTEXT_ACTIONS.SET_CHAT_DATA, payload: data.chats});
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
          type: CONTEXT_ACTIONS.EDIT_CHAT_HISTORY_FAVOURITE,
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

  const handleDelete = async (id: any) => {
    console.log(id);

    try {
      const {status} = await supabase
        .from('chat_history')
        .delete()
        .eq('id', id);
      console.log(status, '-error');

      dispatch({
        type: CONTEXT_ACTIONS.DELETE_CHAT_HISTORY,
        payload: {id: id},
      });
    } catch (e) {
      console.log('errrr', e);
    }
  };

  const handleChangeTitleOpenModal = async (id: any, title: string) => {
    setModalVisible(true);
    setTitleEditDetails({id, title});
  };

  return (
    <>
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          backgroundColor: colors.DarkGray,
        }}
        className="h-full w-full flex flex-col p-4 ">
        <Text style={{fontSize: scale(20)}} className=" text-white ">
          History
        </Text>
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
        {/* hr */}
        <View
          style={{marginBottom: scale(15), height: scale(1)}}
          className="bg-gray-500/70 rounded-full "></View>
        {/* Favourites */}
        <View style={{marginBottom: scale(12)}}>
          <TouchableOpacity
            onPress={() => setShowFavourites(prev => !prev)}
            className="mb-2 flex flex-row justify-between items-center">
            <View className="flex flex-row items-center" style={{gap: 10}}>
              <Icon2 name="heart" size={scale(14)} color="white" />
              <Text style={{fontSize: scale(16)}} className="text-white ">
                Favourites
              </Text>
            </View>
            {!showFavourites ? (
              <Icon name="chevron-right" size={scale(14)} color="white" />
            ) : (
              <Icon name="chevron-down" size={scale(14)} color="white" />
            )}
          </TouchableOpacity>
          {showFavourites && (
            <ScrollView
              contentContainerStyle={{gap: 20}}
              className="mt-2  flex flex-col max-h-52 ">
              {/* list */}
              <HistoryListItem
                favourite={true}
                chatHistory={chatHistory}
                searchText={searchText}
                handleSelectChat={handleSelectChat}
                handleChangeTitleOpenModal={handleChangeTitleOpenModal}
                handleFavourite={handleFavourite}
                handleDelete={handleDelete}
              />
            </ScrollView>
          )}
        </View>
        {/* hr */}
        <View
          style={{marginBottom: scale(15), height: scale(1)}}
          className="bg-gray-500/70 rounded-full"></View>
        {/* history */}
        <ScrollView
          contentContainerStyle={{display: 'flex', gap: 15}}
          className="flex-1 mb-4">
          <HistoryListItem
            favourite={false}
            chatHistory={chatHistory}
            searchText={searchText}
            handleSelectChat={handleSelectChat}
            handleChangeTitleOpenModal={handleChangeTitleOpenModal}
            handleFavourite={handleFavourite}
            handleDelete={handleDelete}
          />
        </ScrollView>
        {/* hr */}
        <View
          style={{marginBottom: scale(15), height: scale(1)}}
          className="bg-gray-500/70 rounded-full "></View>
        <TouchableOpacity
          onPress={() => navigation.navigate('settings')}
          style={{marginBottom: bottomBarHeight + 30}}
          className=" w-full  flex flex-row justify-between items-center">
          <View
            style={{gap: 10}}
            className="flex flex-row mr-4  flex-1 overflow-hidden items-center">
            <Image
              style={{height: scale(35), width: scale(35)}}
              className="rounded-full"
              source={{
                uri:
                  user?.user_metadata.avatar_url ??
                  'https://lvoohwcdbziczdjtjycq.supabase.co/storage/v1/object/public/images/user.png',
              }}
            />
            <Text
              style={{fontSize: scale(14)}}
              numberOfLines={1}
              className="text-white  flex-1   ">
              {user?.user_metadata.name
                ? user?.user_metadata.name.replace(regex, '')
                : user.email}
            </Text>
          </View>
          <Icon name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
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
    </>
  );
};

const HistoryListItem = ({
  chatHistory,
  searchText,
  handleSelectChat,
  handleChangeTitleOpenModal,
  handleFavourite,
  favourite,
  handleDelete,
}: any) => {
  return chatHistory
    .filter(
      (history: any) =>
        history.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .map((history: any) => {
      if (history.favourite == favourite) {
        return (
          <View
            key={history.id}
            style={{gap: 10}}
            className="flex flex-row  items-center justify-center">
            <TouchableOpacity
              onPress={() => handleSelectChat(history.id)}
              className="flex-1">
              <Text
                style={{fontSize: scale(16)}}
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-white ">
                {history.title}
              </Text>
            </TouchableOpacity>

            <Popover
              popoverStyle={{
                backgroundColor: '#0D0D0D',
                minWidth: scale(100),
                padding: scale(8),
                borderRadius: 10,
              }}
              placement={PopoverPlacement.AUTO}
              arrowSize={{width: 0, height: 0}}
              verticalOffset={
                StatusBar.currentHeight != undefined
                  ? -StatusBar.currentHeight
                  : -20
              }
              from={
                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  className="  p-2 ">
                  <Icon
                    name="ellipsis"
                    size={scale(14)}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      margin: 'auto',
                    }}
                  />
                </TouchableOpacity>
              }>
              <TouchableOpacity
                onPress={() =>
                  handleChangeTitleOpenModal(history.id, history.title)
                }
                className="  flex flex-row items-center  rounded-lg bg-gray-500/5"
                style={{gap: 15, padding: scale(8)}}>
                <Icon name="pen" size={scale(14)} color="white" />
                <Text style={{fontSize: scale(12)}}>Edit Title</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="  flex flex-row items-center  rounded-lg bg-gray-500/5"
                style={{gap: 15, padding: scale(8)}}
                onPress={() => handleFavourite(history.id, history.favourite)}>
                {!favourite ? (
                  <Icon2 name="heart" size={scale(14)} color="white" />
                ) : (
                  <Icon2 name="heart-o" size={scale(14)} color="white" />
                )}
                <Text style={{fontSize: scale(12)}}>
                  {!favourite ? 'Add to' : 'Remove from'} favourite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-row items-center rounded-lg bg-gray-500/5"
                style={{gap: 15, padding: scale(8)}}
                onPress={() => handleDelete(history.id)}>
                <Icon name="trash" size={scale(14)} color="red" />
                <Text style={{fontSize: scale(12)}}>Delete</Text>
              </TouchableOpacity>
            </Popover>
          </View>
        );
      }
    });
};

export default SideBar;
