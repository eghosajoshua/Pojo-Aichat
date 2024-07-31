import {
  View,
  StatusBar,
  ImageBackground,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import Header from '../components/header';
import BottomBar from '../components/bottomBar';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import ChatText from '../components/chat-text';
import ChatOptions from '../components/chat-options';
import {useContext, useRef, useState} from 'react';
import {Text} from 'react-native';
import colors from '../utils/colors';
import {StoreContext} from '../utils/store';

const {width: screenWidth} = Dimensions.get('window');

const Home = ({navigation}: any) => {
  const [showOptions, setShowOptions] = useState(false);
  const [optionPos, setOptionPos] = useState({x: 0, y: 0});
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [bottomBarHeight, setBottomBarHeight] = useState<number>(0);
  const [selectedText, setSelectedText] = useState('');
  const scrollViewRef = useRef(null);

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
            {showOptions && (
              <ChatOptions
                setShowOptions={setShowOptions}
                optionPos={optionPos}
                headerHeight={headerHeight}
                bottomBarHeight={bottomBarHeight}
                selectedText={selectedText}
              />
            )}
            <View className="p-2">
              <FlatList
                ref={scrollViewRef}
                contentContainerStyle={{gap: 20}}
                data={chatData}
                inverted={true}
                renderItem={({item, index}) =>
                  item.parts[0].text.indexOf('file:') < 0 ? (
                    <ChatText
                      key={index}
                      ai={item.role === 'model'}
                      setShowOptions={setShowOptions}
                      setOptionPos={setOptionPos}
                      text={item.parts[0].text}
                      setSelectedText={setSelectedText}
                    />
                  ) : (
                    <View
                      key={index}
                      style={{alignSelf: 'flex-end', width: 'auto'}}
                      className=" rounded-3xl  rounded-tl-none">
                      <Image
                        style={{
                          width: screenWidth * 0.7,
                          alignSelf: 'flex-end',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          height: screenWidth * 0.7,
                          objectFit: 'contain',
                          backgroundColor: colors.DarkBlue,
                        }}
                        className="rounded-lg "
                        source={{uri: item.parts[0].text}}
                      />
                      <Text>{item.parts[0].text}</Text>
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
