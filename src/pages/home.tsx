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
} from 'react-native';
import Header from '../components/header';
import BottomBar from '../components/bottomBar';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import ChatText from '../components/chat-text';
import ChatOptions from '../components/chat-options';
import {useState} from 'react';

const {width: screenWidth} = Dimensions.get('window');

const Home = ({navigation}: any) => {
  const [showOptions, setShowOptions] = useState(false);
  const [optionPos, setOptionPos] = useState({x: 0, y: 0});
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [bottomBarHeight, setBottomBarHeight] = useState<number>(0);

  return (
    <View className="bg-gray-300 h-full flex flex-col">
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
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
          <ScrollView
            contentContainerStyle={{gap: 20}}
            className="flex-1 p-4 flex flex-col">
            {/* ai text only */}
            <ChatText
              ai={true}
              setShowOptions={setShowOptions}
              setOptionPos={setOptionPos}
            />
            <ChatText
              setShowOptions={setShowOptions}
              setOptionPos={setOptionPos}
            />
            <ChatText
              setShowOptions={setShowOptions}
              setOptionPos={setOptionPos}
            />

            {/* ai image only */}
            <Pressable className="w-full flex flex-col">
              <View
                style={{alignSelf: 'flex-end', width: 'auto'}}
                className="p-3 rounded-3xl bg-blue-900   rounded-tl-none">
                <Image
                  style={{
                    maxWidth: screenWidth * 0.7,
                    maxHeight: screenWidth * 0.7,
                  }}
                  className="rounded-lg "
                  source={require('../../images/payment_potrait.png')}
                />
              </View>
              <View
                style={{alignSelf: 'flex-end'}}
                className="bg-yellow-500 w-fit mt-3">
                <Text>HEllo</Text>
              </View>
            </Pressable>
            <View className="m-4"></View>
          </ScrollView>
        </ImageBackground>
        {showOptions && (
          <ChatOptions
            setShowOptions={setShowOptions}
            optionPos={optionPos}
            headerHeight={headerHeight}
            bottomBarHeight={bottomBarHeight}
          />
        )}
      </View>
      <BottomBar setBottomBarHeight={setBottomBarHeight} />
    </View>
  );
};

export default Home;
