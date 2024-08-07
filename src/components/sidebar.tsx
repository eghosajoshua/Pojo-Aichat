import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import colors from '../utils/colors';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {supabase} from '../utils/supabase';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';

import {scale} from 'react-native-size-matters';
import HistorySearchBar from './history-search-bar';
import HistoryList from './history-list';
import ChangeTitleModal from './modal-change-history-title';
import UserBar from './side-bar-userbar';

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
  } = useContext(StoreContext);

  console.log(chatHistory);

  useEffect(() => {
    const getChatHistory = async () => {
      console.log('hissss');

      try {
        if (user !== null) {
          const {data, error} = await supabase
            .from('chat_history')
            .select('title,id,favourite,created_at')
            .eq('user_id', user.id);
          if (error === null) {
            dispatch({type: CONTEXT_ACTIONS.SET_CHAT_HISTORY, payload: data});
          }
        } else {
          console.log('user is null');
        }
      } catch (e) {
        console.error('chat history error', e);
      }
    };
    getChatHistory();
  }, []);

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
        <HistorySearchBar
          searchText={searchText}
          setSearchText={setSearchText}
        />
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
            <HistoryList
              searchText={searchText}
              chatHistory={chatHistory}
              favourite={true}
              setSearchText={setSearchText}
              navigation={navigation}
              handleChangeTitleOpenModal={handleChangeTitleOpenModal}
            />
          )}
        </View>
        {/* hr */}
        <View
          style={{marginBottom: scale(15), height: scale(1)}}
          className="bg-gray-500/70 rounded-full"></View>
        {/* history */}
        <HistoryList
          searchText={searchText}
          chatHistory={chatHistory}
          favourite={false}
          setSearchText={setSearchText}
          navigation={navigation}
          handleChangeTitleOpenModal={handleChangeTitleOpenModal}
        />
        {/* hr */}
        <View
          style={{marginBottom: scale(15), height: scale(1)}}
          className="bg-gray-500/70 rounded-full "></View>
        <UserBar />
      </View>
      <ChangeTitleModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        titleEditDetails={titleEditDetails}
        setTitleEditDetails={setTitleEditDetails}
      />
    </>
  );
};

export default SideBar;
