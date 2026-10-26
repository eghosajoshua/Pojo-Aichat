import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useEffect, useState} from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, {
  Easing,
  useSharedValue,
  useDerivedValue,
  withTiming,
  withSequence,
  withRepeat as repeat,
} from 'react-native-reanimated';
import colors from '../utils/colors';
import {scale} from 'react-native-size-matters';

const {width} = Dimensions.get('window');

const Payment = ({navigation}: any) => {
  const left1 = useSharedValue(0);
  const left2 = useSharedValue(width);
  const left3 = useSharedValue(0);
  const left4 = useSharedValue(-width);
  const [paymentPrices, setPaymentPrices] = useState([
    {
      name: 'Weekly',
      price: 1.99,
      selected: false,
    },
    {
      name: 'Monthly',
      price: 4.99,
      selected: true,
    },
    {
      name: 'Yearly',
      price: 29.99,
      selected: false,
    },
  ]);

  const SetSelected = (name: string) => {
    let newData = paymentPrices.map(price =>
      price.name === name
        ? {...price, selected: true}
        : {...price, selected: false},
    );
    setPaymentPrices(newData);
  };

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

  // Monitor and modify left 1
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

  // Monitor and modify left 2
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
  // Monitor and modify left 3
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

  // Monitor and modify left 4
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
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black"></LinearGradient>
        <View style={{marginTop: StatusBar.currentHeight}}></View>
        <View className="h-full w-full p-4 pt-6 pb-12 z-10 flex justify-between">
          <View className="flex w-full flex-row justify-between">
            <TouchableOpacity
              style={{height: scale(20), width: scale(20)}}
              onPress={() => navigation.navigate('home')}
              className="flex items-center justify-center rounded-full bg-white/20 ">
              <Icon name="close" size={scale(14)} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingHorizontal: scale(10), paddingVertical: scale(2)}}
              className="bg-white/20 h-fit rounded-full">
              <Text
                style={{fontSize: scale(12)}}
                className="text-white font-light  ">
                Restore
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{fontSize: scale(25)}}
            className="text-white font-extrabold">
            PRO Access
          </Text>
        </View>
      </ImageBackground>
      <View className="flex-1 bg-black ">
        <View className="flex flex-col flex-1 justify-center">
          <View>
            <Animated.View
              style={{left: left1}}
              className="flex flex-row w-full gap-2 absolute  ">
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
          <View style={{marginTop: scale(40)}}>
            <Animated.View
              style={{left: left3}}
              className="flex flex-row w-full gap-2 absolute ">
              <SlidingText text="Ai chat" />
              <SlidingText text="Text to voice" />
              <SlidingText text="Ai chat" />
            </Animated.View>
            <Animated.View
              style={{left: left4}}
              className="flex flex-row w-full gap-2 absolute">
              <SlidingText text="zzzz" />
            </Animated.View>
          </View>
        </View>
        <View
          style={{margin: scale(20), marginHorizontal: scale(35)}}
          className=" mt-10">
          <View style={{gap: 12}} className="flex flex-row mb-4 items-end">
            {paymentPrices.map((price, index) => (
              <PriceButton
                key={index}
                name={price.name}
                price={price.price}
                selected={price.selected}
                SetSelected={SetSelected}
              />
            ))}
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <LinearGradient
              start={{x: 0.5, y: 0.25}}
              end={{x: 0.5, y: 1.0}}
              colors={[colors.LightBlue, colors.DarkBlue]}
              style={{gap: scale(20), padding: scale(10)}}
              className=" rounded-lg">
              <Text
                style={{fontSize: scale(14)}}
                className="text-center font-semibold text-black">
                Continue with free trial
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View className="flex flex-row justify-between py-3">
            <TouchableOpacity>
              <Text style={{fontSize: scale(12)}} className="text-white">
                Cancel Anytime
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{fontSize: scale(12)}} className="text-white">
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const SlidingText = ({text}: {text: string}) => {
  return (
    <Text
      style={{
        fontSize: scale(12),
        paddingHorizontal: scale(10),
        paddingVertical: scale(5),
      }}
      className="text-white/50 mx-2 flex-1 rounded-full bg-gray-500/10">
      {text}
    </Text>
  );
};

/**
 * A React component that renders a price button with a gradient background and displays the price and name of the plan.
 *
 * @param {object} props - The component props.
 * @param {string} props.name - The name of the plan.
 * @param {number} props.price - The price of the plan.
 * @param {boolean} props.selected - Indicates whether the plan is currently selected.
 * @param {Function} props.SetSelected - A function to set the selected plan.
 * @returns {JSX.Element} - The price button component.
 */
const PriceButton = ({
  name,
  price,
  selected,
  SetSelected,
}: {
  name: string;
  price: number;
  selected: boolean;
  SetSelected: Function;
}) => {
  return (
    <TouchableOpacity
      onPress={() => SetSelected(name)}
      style={{height: name == 'Monthly' ? scale(110) : scale(90)}}
      className={'bg-gray-500/10 flex-1 overflow-hidden  rounded-lg relative'}>
      <LinearGradient
        start={{x: 0.5, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={[colors.DarkBlue, colors.LightBlue]}
        className="absolute top-0 left-0 w-full h-full"></LinearGradient>
      <View className="h-full">
        <View className="flex-1 items-center justify-center bg-black m-[0.5px] mb-0 rounded-t-lg">
          <Text
            style={{fontSize: scale(20)}}
            className="text-white  text-center">
            ${price}
          </Text>
        </View>
        <Text
          style={[
            selected && {
              backgroundColor: colors.LightBlue,
              color: 'black',
            },
            {fontSize: scale(15), padding: scale(1)},
          ]}
          className="text-white text-xl m-[0.5px] rounded-b-lg mt-0 bg-gray-800 text-center ">
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Payment;
