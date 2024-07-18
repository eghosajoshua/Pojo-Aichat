import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useEffect} from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useSharedValue,
  useDerivedValue,
  withTiming,
  withSequence,
  withRepeat as repeat,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const Payment = () => {
  const left1 = useSharedValue(0);
  const left2 = useSharedValue(width);
  const left3 = useSharedValue(0);
  const left4 = useSharedValue(-width);

  useEffect(() => {
    left1.value = repeat(
      withTiming(-width, {duration: 10000, easing: Easing.linear}),
      -1,
      false,
    );
    left2.value = repeat(
      withSequence(
        withTiming(0, {duration: 10000, easing: Easing.linear}),
        withTiming(-width, {duration: 10000, easing: Easing.linear}),
      ),
      -1,
      false,
    );
    left3.value = repeat(
      withTiming(width, {duration: 10000, easing: Easing.linear}),
      -1,
      false,
    );
    left4.value = repeat(
      withSequence(
        withTiming(0, {duration: 10000, easing: Easing.linear}),
        withTiming(width, {duration: 10000, easing: Easing.linear}),
      ),
      -1,
      false,
    );
  }, []);

  // Monitor and modify translateX1
  useDerivedValue(() => {
    if (left1.value === -width) {
      left1.value = width;
      left1.value = repeat(
        withTiming(-width, {duration: 20000, easing: Easing.linear}),
        -1,
        false,
      );
    }
  });

  // Monitor and modify translateX2
  useDerivedValue(() => {
    if (left2.value === -width) {
      left2.value = width;
      left2.value = repeat(
        withTiming(-width, {duration: 20000, easing: Easing.linear}),
        -1,
        false,
      );
    }
  });
  // Monitor and modify translateX1
  useDerivedValue(() => {
    if (left3.value === width) {
      left3.value = -width;
      left3.value = repeat(
        withTiming(width, {duration: 20000, easing: Easing.linear}),
        -1,
        false,
      );
    }
  });

  // Monitor and modify translateX2
  useDerivedValue(() => {
    if (left4.value === width) {
      left4.value = -width;
      left4.value = repeat(
        withTiming(width, {duration: 20000, easing: Easing.linear}),
        -1,
        false,
      );
    }
  });

  return (
    <View className="h-full flex">
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        className="flex-1"
        source={require('../../images/payment_potrait.png')}>
        <LinearGradient
          start={{x: 0.5, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={['transparent', 'rgba(0,0,0,0.5)']}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-red-500"></LinearGradient>
        <View className="h-full w-full p-4 pt-12  flex justify-between">
          <View className="flex w-full flex-row justify-between">
            <TouchableOpacity className="flex items-center justify-center rounded-full bg-white/20 h-7 w-7 ">
              <Icon name="close" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/20 h-fit p-1 px-4 rounded-full">
              <Text className="text-white text-sm font-light  ">Restore</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-white text-3xl font-extrabold">PRO Access</Text>
        </View>
      </ImageBackground>
      <View className="flex-1 bg-black ">
        <View className="flex flex-col gap-11">
          <View className=" ">
            <Animated.View
              style={{left: left1}}
              className="flex flex-row w-full gap-2 absolute ">
              <SlidingText text="Ai chat" />
              <SlidingText text="Text to voice" />
              <SlidingText text="Ai chat" />
            </Animated.View>
            <Animated.View
              style={{left: left2}}
              className="flex flex-row w-full gap-2 absolute">
              <SlidingText text="zzzz" />
              <SlidingText text="Text to voice" />
              <SlidingText text="wwww" />
            </Animated.View>
          </View>
          <View className="  flex ">
            <Animated.View
              style={{left: left3}}
              className="flex flex-row w-full gap-2 absolute ">
              <SlidingText text="Ai chat" />
              <SlidingText text="Text to voice" />
              <SlidingText text="Ai chat" />
            </Animated.View>
            b
            <Animated.View
              style={{left: left4}}
              className="flex flex-row w-full gap-2 absolute">
              <SlidingText text="zzzz" />
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
};

const SlidingText = ({text}: {text: string}) => {
  return (
    <Text className="text-white/50 mx-2 flex-1 p-2 px-5 rounded-full bg-white/10">
      {text}
    </Text>
  );
};

export default Payment;
