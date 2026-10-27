import {View} from 'react-native';
import colors from '../utils/colors';
import Markdown from 'react-native-markdown-display';
import {useContext} from 'react';
import {StoreContext} from '../context/store';
import {scale} from 'react-native-size-matters';

const ChatText = ({ai = false, text}: {ai?: boolean; text: string}) => {
  const {
    store: {chatFontSize},
  } = useContext(StoreContext) ?? {};

  return (
    <View className=" w-full flex flex-col">
      <View
        style={
          ai
            ? {
                borderTopLeftRadius: 0,
                alignSelf: 'flex-start',
                paddingVertical: scale(6),
              }
            : {
                backgroundColor: colors.DarkBlue,
                borderTopRightRadius: 0,
                alignSelf: 'flex-end',
              }
        }
        className="bg-[#0D0D0D] rounded-2xl px-3 w-fit max-w-[90%] ">
        <Markdown
          style={{
            body: {
              color: 'white',
              fontSize: scale(chatFontSize),
              lineHeight: scale(chatFontSize * 1.4),
            },
          }}>
          {text}
        </Markdown>
      </View>
    </View>
  );
};

export default ChatText;
