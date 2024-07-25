import {
  View,
  Text,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import ChatOptions from './chat-options';
import colors from '../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChatText = ({
  ai = false,
  setShowOptions,
  setOptionPos,
}: {
  ai?: boolean;
  setShowOptions?: any;
  setOptionPos?: any;
}) => {
  return (
    <View className=" w-full flex flex-col">
      <Pressable
        onLongPress={e => {
          setOptionPos({x: e.nativeEvent.pageX, y: e.nativeEvent.pageY});
          setShowOptions(true);
        }}>
        <Text
          style={
            ai
              ? {alignSelf: 'flex-start'}
              : {alignSelf: 'flex-end', backgroundColor: colors.DarkBlue}
          }
          className="text-slate-200 w-fit max-w-[90%] p-4 text-lg rounded-3xl rounded-tl-none bg-[#0D0D0D] leading-6">
          Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Repellendus ut ipsam, odio consectetur, quidem accusamus hic nam
          provident perferendis quos molestias ullam, quae nulla repellat ipsa
          deserunt debitis atque minus voluptates enim earum iste in eos.
          Exercitationem corrupti eligendi culpapsam! Distinctio accusamus quia
          necessitatibus, animi at quibusdam ea? Aperiam?
        </Text>
      </Pressable>
    </View>
  );
};

export default ChatText;
