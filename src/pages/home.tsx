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
import {useRef, useState} from 'react';
import {User} from '@supabase/supabase-js';

const {width: screenWidth} = Dimensions.get('window');

const Home = ({navigation, user}: {navigation: any; user: User | null}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [optionPos, setOptionPos] = useState({x: 0, y: 0});
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [bottomBarHeight, setBottomBarHeight] = useState<number>(0);
  const [selectedText, setSelectedText] = useState('');
  const [chatData, setChatData] = useState<
    Array<{role: string; parts: {text: string}[]}>
  >([]);
  const scrollViewRef = useRef(null);

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
                  item.parts[0].text.indexOf('https') < 0 ? (
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
                          maxWidth: screenWidth * 0.7,
                          maxHeight: screenWidth * 0.7,
                        }}
                        className="rounded-lg "
                        source={require('../../images/payment_potrait.png')}
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
          setChatData={setChatData}
          chatData={chatData}
        />
      </View>
    </>
  );
};

export default Home;
