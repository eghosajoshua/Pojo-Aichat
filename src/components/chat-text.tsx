import {View, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';
import Markdown from 'react-native-markdown-display';
import markdownToTxt from 'markdown-to-txt';

const ChatText = ({
  ai = false,
  setShowOptions,
  setOptionPos,
  text,
  setSelectedText,
}: {
  ai?: boolean;
  setShowOptions?: any;
  setOptionPos?: any;
  text: string;
  setSelectedText: any;
}) => {
  return (
    <View className=" w-full flex flex-col">
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={e => {
          setOptionPos({x: e.nativeEvent.pageX, y: e.nativeEvent.pageY});
          setShowOptions(true);
          setSelectedText(markdownToTxt(text));
        }}>
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
                fontSize: 18,
                lineHeight: 30,
              },
            }}>
            {text}
          </Markdown>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatText;
