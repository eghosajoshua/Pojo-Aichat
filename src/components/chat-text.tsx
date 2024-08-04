import {View, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';
import Markdown from 'react-native-markdown-display';
import markdownToTxt from 'markdown-to-txt';
import {useContext} from 'react';
import {StoreContext} from '../utils/store';

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
                paddingVertical: 10,
              }
            : {
                backgroundColor: colors.DarkBlue,
                borderTopRightRadius: 0,
                alignSelf: 'flex-end',
              }
        }
        className="bg-[#0D0D0D] rounded-2xl px-4 w-fit max-w-[98%] ">
        <Markdown
          style={{
            body: {
              color: 'white',
              fontSize: chatFontSize,
              lineHeight: 30,
            },
          }}>
          {text}
        </Markdown>
      </View>
    </View>
  );
};

export default ChatText;
