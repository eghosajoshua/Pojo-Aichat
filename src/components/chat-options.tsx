import {
  View,
  TouchableOpacity,
  Text,
  Pressable,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useState, useCallback, useMemo, useEffect} from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import Clipboard from '@react-native-clipboard/clipboard';
import Tts from 'react-native-tts';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

//this script involves positioning the options panel at the touch point , so using screen size , the option panel size and the touch position

const ChatOptions = ({
  setShowOptions,
  optionPos,
  headerHeight,
  bottomBarHeight,
  selectedText,
}: {
  setShowOptions: any;
  optionPos: any;
  headerHeight: number;
  bottomBarHeight: number;
  selectedText: string;
}) => {
  const [widthDifference, setWithDifference] = useState(0);
  const [heightDifference, setHeightDifference] = useState(500);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    Tts.stop();
  }, []);

  const handleLayout = useCallback((e: any) => {
    //get and set the chat options width and height
    let {width, height} = e.nativeEvent.layout;
    //calculate by how much the panel is overflowing off the screen
    let xdifference = screenWidth - (optionPos.x + width);
    let ydifference = screenHeight - (optionPos.y + height);
    setWithDifference(xdifference);
    setHeightDifference(ydifference);
  }, []);

  return (
    <View className="w-full h-full top-0 left-0 absolute z-10">
      <Pressable
        onPress={() => {
          setShowOptions(false);
        }}
        className="w-full h-full  top-0 left-0 absolute"></Pressable>
      <View
        onLayout={handleLayout}
        style={{
          alignSelf: 'flex-start',
          gap: 30,
          left: optionPos.x + (widthDifference < 0 && widthDifference),
          top:
            optionPos.y -
            ((StatusBar.currentHeight ?? 0) + headerHeight) -
            (heightDifference < bottomBarHeight + 20
              ? bottomBarHeight + 50
              : 0),
        }}
        className="w-fit mt-3 flex flex-col  px-4 absolute bg-gray-800/90 p-5 rounded-lg">
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(selectedText);
            setCopied(true);
            setTimeout(() => {
              setShowOptions(false);
            }, 10);
          }}
          className="flex flex-row items-center"
          style={{gap: 5}}>
          {!copied ? (
            <Icon color="white" name="copy" size={20} />
          ) : (
            <Icon color="lime" name="check" size={20} />
          )}
          <Text className="text-white text-lg">Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowOptions(false);
            Tts.speak(selectedText);
          }}
          className="flex flex-row items-center"
          style={{gap: 10}}>
          <Icon color="white" name="volume-high" size={20} />
          <Text className="text-white text-lg">Read aloud</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatOptions;
