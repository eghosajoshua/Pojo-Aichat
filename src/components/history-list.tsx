import React, {useState} from 'react';
import {FlatList} from 'react-native';
import HistoryListItem from './history-list-item';
import {Text} from 'react-native';

const HistoryList = ({
  chatHistory,
  favourite,
  searchText,
  setSearchText,
  handleChangeTitleOpenModal,
  navigation,
}: {
  chatHistory: any[];
  favourite: boolean;
  searchText: string;
  setSearchText: Function;
  handleChangeTitleOpenModal: Function;
  navigation: any;
}) => {
  return (
    <FlatList
      data={chatHistory
        .filter(
          (history: any) =>
            history.favourite == favourite &&
            history.title.toLowerCase().indexOf(searchText.toLowerCase()) !==
              -1,
        )
        .sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )}
      renderItem={({item}) => (
        <HistoryListItem
          item={item}
          setSearchText={setSearchText}
          handleChangeTitleOpenModal={handleChangeTitleOpenModal}
          navigation={navigation}
        />
      )}
    />
  );
};

export default HistoryList;
