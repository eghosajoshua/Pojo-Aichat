import {
  View,
  StatusBar,
  ImageBackground,
  Dimensions,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/header';
import BottomBar from '../components/bottomBar';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import ChatText from '../components/chat-text';
import ChatOptions from '../components/chat-options';
import {useContext, useRef, useState} from 'react';
import colors from '../utils/colors';
import {StoreContext} from '../utils/store';
import Popover from 'react-native-popover-view/dist/Popover';
import {PopoverPlacement} from 'react-native-popover-view';
import Clipboard from '@react-native-clipboard/clipboard';
import Tts from 'react-native-tts';
import {scale} from 'react-native-size-matters';

const {width: screenWidth} = Dimensions.get('window');

const Home = ({navigation}: any) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [bottomBarHeight, setBottomBarHeight] = useState<number>(0);
  const scrollViewRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const {
    store: {chatData},
  } = useContext(StoreContext) || {store: null};

  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#0D0D0D"
      />
      <View className="bg-gray-300 h-full flex flex-col">
        <View style={{marginTop: StatusBar.currentHeight}}></View>
        <View></View>
        <Header
          navigation={navigation}
          headerHeight={headerHeight}
          setHeaderHeight={setHeaderHeight}
        />
        <View className="flex-1 relative">
          <ImageBackground
            className="flex-1"
            source={require('../../images/chat-bg.jpg')}>
            <View className="absolute top-0 left-0 w-full h-full bg-black/50"></View>

            <View className="p-2">
              <FlatList
                ref={scrollViewRef}
                contentContainerStyle={{gap: 15}}
                data={chatData}
                inverted={true}
                renderItem={({item, index}) =>
                  item.parts[0].text.indexOf('file:') < 0 ? (
                    <Popover
                      popoverStyle={{
                        backgroundColor: '#0D0D0D',
                        minWidth: scale(150),
                        padding: scale(10),
                        borderRadius: 10,
                        gap: 10,
                      }}
                      placement={PopoverPlacement.AUTO}
                      arrowSize={{width: 0, height: 0}}
                      verticalOffset={
                        StatusBar.currentHeight != undefined
                          ? -StatusBar.currentHeight
                          : -20
                      }
                      from={
                        <TouchableOpacity activeOpacity={0.8}>
                          <ChatText
                            key={index}
                            ai={item.role === 'model'}
                            text={item.parts[0].text}
                          />
                        </TouchableOpacity>
                      }>
                      <TouchableOpacity
                        onPress={() => {
                          Clipboard.setString(item.parts[0].text);
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 50);
                        }}
                        style={{padding: scale(8), gap: scale(10)}}
                        className="flex flex-row items-center bg-gray-500/5 rounded-lg">
                        {!copied ? (
                          <Icon color="white" name="copy" size={scale(15)} />
                        ) : (
                          <Icon color="lime" name="check" size={scale(15)} />
                        )}
                        <Text
                          style={{fontSize: scale(15)}}
                          className="text-white ">
                          Copy
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          Tts.speak(item.parts[0].text);
                        }}
                        style={{padding: scale(8), gap: scale(10)}}
                        className="flex flex-row items-center bg-gray-500/5 rounded-lg">
                        <Icon
                          color="white"
                          name="volume-high"
                          size={scale(15)}
                        />
                        <Text
                          style={{fontSize: scale(15)}}
                          className="text-white">
                          Read aloud
                        </Text>
                      </TouchableOpacity>
                    </Popover>
                  ) : (
                    <View
                      key={index}
                      style={{alignSelf: 'flex-end', width: 'auto'}}
                      className=" rounded-3xl rounded-tl-none justify-start flex items-start h-100 w-100">
                      <Image
                        style={{
                          width: screenWidth * 0.7,
                          alignSelf: 'flex-end',
                          display: 'flex',
                          minHeight: screenWidth * 0.85,
                          objectFit: 'cover',
                          backgroundColor: colors.DarkBlue,
                        }}
                        className="rounded-lg "
                        source={{uri: item.parts[0].text}}
                      />
                    </View>
                  )
                }
              />
            </View>
          </ImageBackground>
        </View>
        <BottomBar
          scrollViewRef={scrollViewRef}
          setBottomBarHeight={setBottomBarHeight}
        />
      </View>
    </>
  );
};

export default Home;
