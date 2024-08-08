import {FlatList} from 'react-native';
import HistoryListItem from './history-list-item';

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
  const filteredData = chatHistory
    .filter(
      (history: any) =>
        history.favourite == favourite &&
        history.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  return (
    <FlatList
      data={filteredData}
      renderItem={({item, index}) => (
        <HistoryListItem
          item={item}
          lastItem={index == filteredData.length - 1}
          setSearchText={setSearchText}
          handleChangeTitleOpenModal={handleChangeTitleOpenModal}
          navigation={navigation}
        />
      )}
    />
  );
};

export default HistoryList;
