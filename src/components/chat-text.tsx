import {View, Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import ChatOptions from './chat-options';
import colors from '../utils/colors';

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
        onLongPress={e => {
          setOptionPos({x: e.nativeEvent.pageX, y: e.nativeEvent.pageY});
          setShowOptions(true);
          setSelectedText(text);
        }}>
        <View
          style={
            ai
              ? {borderTopLeftRadius: 0, alignSelf: 'flex-start'}
              : {
                  backgroundColor: colors.DarkBlue,
                  borderTopRightRadius: 0,
                  alignSelf: 'flex-end',
                }
          }
          className="bg-[#0D0D0D] rounded-3xl w-fit max-w-[90%] ">
          <Text className="text-slate-200 w-fit p-4 text-lg  leading-6">
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatText;
