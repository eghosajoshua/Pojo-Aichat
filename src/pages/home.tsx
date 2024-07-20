import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import Header from '../components/header';
import BottomBar from '../components/bottomBar';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';

const {width: screenWidth} = Dimensions.get('window');

const Home = () => {
  return (
    <View className="bg-gray-300 h-full flex flex-col">
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      <Header />
      <ImageBackground
        className="flex-1"
        source={require('../../images/chat-bg.jpg')}>
        <View className="absolute top-0 left-0 w-full h-full bg-black/50"></View>
        <ScrollView
          contentContainerStyle={{gap: 20}}
          className="flex-1 p-4 flex flex-col">
          {/* ai text only */}
          <View className=" w-full flex flex-col">
            <Text
              style={{alignSelf: 'flex-start'}}
              className="text-slate-200 w-fit p-4 text-lg rounded-3xl rounded-tl-none bg-[#0D0D0D] leading-6">
              Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Repellendus ut ipsam, odio consectetur, quidem
              accusamus hic nam provident perferendis quos molestias ullam, quae
              nulla repellat ipsa deserunt debitis atque minus voluptates enim
              earum iste in eos. Exercitationem corrupti eligendi culpapsam!
              Distinctio accusamus quia necessitatibus, animi at quibusdam ea?
              Aperiam?
            </Text>
            <View
              style={{alignSelf: 'flex-start', gap: 40}}
              className="w-fit mt-3  flex flex-row mb-4 px-4">
              <TouchableOpacity>
                <Icon color="white" name="copy" size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon color="lime" name="check" size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon color="white" name="volume-high" size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon color="white" name="download" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          {/* user text only */}
          <View className="w-full flex flex-col">
            <Text
              style={{alignSelf: 'flex-end'}}
              className="text-slate-50 w-fit p-4 text-lg rounded-3xl rounded-tr-none bg-blue-900 leading-6">
              Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Repellendus ut ipsam, odio consectetur, quidem
              accusamus hic nam provident perferendis quos molestias ullam, quae
              Aperiam?
            </Text>
            <View
              style={{alignSelf: 'flex-end'}}
              className="bg-yellow-500 w-fit mt-3">
              <Text>HEllo</Text>
            </View>
          </View>
          {/* ai image only */}
          <Pressable className="w-full flex flex-col">
            <View
              style={{alignSelf: 'flex-start', width: 'auto'}}
              className="p-3 rounded-3xl bg-[#0D0D0D]   rounded-tl-none">
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
              style={{alignSelf: 'flex-start'}}
              className="bg-yellow-500 w-fit mt-3">
              <Text>HEllo</Text>
            </View>
          </Pressable>
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
      <BottomBar />
    </View>
  );
};

export default Home;
