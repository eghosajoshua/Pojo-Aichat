import React, {useContext} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {StoreContext} from '../context/store';
import Popover from 'react-native-popover-view/dist/Popover';
import {PopoverPlacement} from 'react-native-popover-view';
import {scale} from 'react-native-size-matters';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {chatHistoryType} from '../types/type';
import CONTEXT_ACTIONS from '../context/actions';

function HistoryListItem({
  item,
  setSearchText,
  handleChangeTitleOpenModal,
  navigation,
  lastItem,
}: {
  item: chatHistoryType;
  handleChangeTitleOpenModal: Function;
  setSearchText: Function;
  navigation: any;
  lastItem: boolean;
}) {
  const {dispatch} = useContext(StoreContext);

  const handleSelectChat = (id: number) => {
    dispatch({type: CONTEXT_ACTIONS.SET_CURRENT_CHAT_ID, payload: id});
    dispatch({type: CONTEXT_ACTIONS.SET_CHAT_DATA, payload: item.chats || []});
    setSearchText('');
    navigation.closeDrawer();
  };
  const handleAddToFavourite = (id: any, favourite: Boolean) => {
    dispatch({
      type: CONTEXT_ACTIONS.EDIT_CHAT_HISTORY_FAVOURITE,
      payload: {favourite: !favourite, id: id},
    });
  };

  const handleDelete = (id: any) => {
    dispatch({type: CONTEXT_ACTIONS.DELETE_CHAT_HISTORY, payload: {id: id}});
  };

  return (
    <View
      key={item.id}
      style={{gap: 10, padding: 10, borderBottomWidth: !lastItem ? 0.2 : 0}}
      className="flex flex-row  items-center   border-gray-500/30  justify-center">
      <TouchableOpacity
        onPress={() => handleSelectChat(item.id)}
        className="flex-1">
        <Text
          style={{fontSize: scale(16)}}
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-white ">
          {item.title}
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
          StatusBar.currentHeight != undefined ? -StatusBar.currentHeight : -20
        }
        from={
          <TouchableOpacity style={{alignSelf: 'flex-end'}} className="  p-2 ">
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
          onPress={() => handleChangeTitleOpenModal(item.id, item.title)}
          className="  flex flex-row items-center  rounded-lg bg-gray-500/5"
          style={{gap: 15, padding: scale(8)}}>
          <Icon name="pen" size={scale(14)} color="white" />
          <Text style={{fontSize: scale(12)}}>Edit Title</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="  flex flex-row items-center mt-3 rounded-lg bg-gray-500/5"
          style={{gap: 15, padding: scale(8)}}
          onPress={() => handleAddToFavourite(item.id, item.favourite)}>
          {!item.favourite ? (
            <Icon2 name="heart" size={scale(14)} color="white" />
          ) : (
            <Icon2 name="heart-o" size={scale(14)} color="white" />
          )}
          <Text style={{fontSize: scale(12)}}>
            {!item.favourite ? 'Add to' : 'Remove from'} favourite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row mt-3 items-center rounded-lg bg-gray-500/5"
          style={{gap: 15, padding: scale(8)}}
          onPress={() => handleDelete(item.id)}>
          <Icon name="trash" size={scale(14)} color="red" />
          <Text style={{fontSize: scale(12)}}>Delete</Text>
        </TouchableOpacity>
      </Popover>
    </View>
  );
}

export default HistoryListItem;
