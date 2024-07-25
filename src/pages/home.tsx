import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import Header from '../components/header';
import BottomBar from '../components/bottomBar';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import ChatText from '../components/chat-text';
import ChatOptions from '../components/chat-options';
import {useRef, useState} from 'react';

const {width: screenWidth} = Dimensions.get('window');

const Home = ({navigation}: any) => {
  const [showOptions, setShowOptions] = useState(false);
  const [optionPos, setOptionPos] = useState({x: 0, y: 0});
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [bottomBarHeight, setBottomBarHeight] = useState<number>(0);
  const [selectedText, setSelectedText] = useState('');
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
            <View className=" bg-green-300 p-2">
              <FlatList
                ref={scrollViewRef}
                className="bg-red-400"
                data={[
                  {role: 'user', message: 'hello'},
                  {
                    role: 'bot',
                    message: 'hmmm',
                  },
                  {role: 'user', message: 'hello'},
                  {
                    role: 'bot',
                    message: 'hmmm',
                  },
                  {role: 'user', message: 'hello'},
                  {
                    role: 'bot',
                    message:
                      'hmmm vngvnaegv agnng reggrvnerv aneo  ivnanvoapvan',
                  },
                  {role: 'user', message: 'hello'},
                  {
                    role: 'bot',
                    message: 'hmmm',
                  },
                  {role: 'user', message: 'hello'},
                  {
                    role: 'bot',
                    message: 'hmmm',
                  },
                  {role: 'user', message: 'hello'},
                  {
                    role: 'bot',
                    message:
                      'hmmm vngvnaegv agnng reggrvnerv aneo  ivnanvoapvan',
                  },
                  {role: 'user', message: 'hello'},
                  {
                    role: 'bot',
                    message: 'hmmm',
                  },
                  {role: 'user', message: 'hello'},
                  {
                    role: 'bot',
                    message: 'hmmm',
                  },
                  {role: 'user', message: 'hello'},
                  {
                    role: 'bot',
                    message:
                      'hmmm vngvnaegv agnng reggrvnerv aneo  ivnanvoapvan',
                  },
                ].reverse()}
                inverted={true}
                renderItem={({item}) =>
                  item.message.indexOf('https') < 0 ? (
                    <ChatText
                      ai={item.role == 'bot' && true}
                      setShowOptions={setShowOptions}
                      setOptionPos={setOptionPos}
                      text={item.message}
                      setSelectedText={setSelectedText}
                    />
                  ) : (
                    <View
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
          {showOptions && (
            <ChatOptions
              setShowOptions={setShowOptions}
              optionPos={optionPos}
              headerHeight={headerHeight}
              bottomBarHeight={bottomBarHeight}
              selectedText={selectedText}
            />
          )}
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
