import {View, FlatList, TouchableOpacity} from 'react-native';
import ChatPopover from '../components/chat-pop-over';
import {StoreContext} from '../context/store';
import {useContext} from 'react';
import ChatText from '../components/chat-text';
import ChatImage from './chat-image';

const ChatList = ({
  scrollViewRef,
}: {
  scrollViewRef: React.MutableRefObject<null>;
}) => {
  const {
    store: {chatData},
  } = useContext(StoreContext);

  return (
    <View className="p-2">
      <FlatList
        ref={scrollViewRef}
        contentContainerStyle={{gap: 15}}
        data={chatData}
        inverted={true}
        renderItem={({item, index}) =>
          item.parts[0].text.indexOf('file:') < 0 ? (
            <ChatPopover chatText={item.parts[0].text}>
              <TouchableOpacity activeOpacity={0.8}>
                <ChatText
                  key={index}
                  ai={item.role === 'model'}
                  text={item.parts[0].text}
                />
              </TouchableOpacity>
            </ChatPopover>
          ) : (
            <ChatImage imageUrl={item.parts[0].text} />
          )
        }
      />
    </View>
  );
};

export default ChatList;
