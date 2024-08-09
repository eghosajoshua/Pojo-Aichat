import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from 'react-native';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {supabase} from '../utils/supabase';
import env from '../utils/env';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import {useContext, useState} from 'react';
import {scale} from 'react-native-size-matters';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import LoginEmailForm from '../components/login-email-form';
import SignupEmailForm from '../components/signup-email-form';
import ConfirmEmail from '../components/confirm-email';

const Login = ({navigation}: any) => {
  const {dispatch} = useContext(StoreContext) || {dispatch: null};
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  GoogleSignin.configure({
    webClientId: env.GOOGLE_WEB_CLIENT_ID,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const {data, error} = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
        });

        if (error !== null) {
          //!handle sign-in error
          if (Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
              'something went wrong a',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        } else {
          //sign in
          dispatch({type: CONTEXT_ACTIONS.SET_USER, payload: data.user});
          dispatch({type: CONTEXT_ACTIONS.SET_CHAT_HISTORY, payload: []});
          dispatch({type: CONTEXT_ACTIONS.SET_CURRENT_CHAT_ID, payload: null});
          dispatch({type: CONTEXT_ACTIONS.SET_CHAT_DATA, payload: []});
          navigation.navigate('home');
        }
        // console.log(error, data);
      } else {
        //!handle sign-in error
        if (Platform.OS == 'android') {
          ToastAndroid.showWithGravity(
            'something went wrong b',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return;
      }

      console.error(error);

      //!handle sign-in error
      if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
          'something went wrong c',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }
  };

  return (
    <View className="flex flex-1 bg-black">
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View className="flex-1 items-center justify-center">
        {isForgotPasswordVisible && (
          <ConfirmEmail
            currentUserEmail={currentUserEmail}
            navigation={navigation}
          />
        )}
        {isLoginFormVisible && (
          <LoginEmailForm
            setIsLoginFormVisible={setIsLoginFormVisible}
            setIsSignupFormVisible={setIsSignupFormVisible}
            setIsForgotPasswordVisible={setIsForgotPasswordVisible}
            navigation={navigation}
          />
        )}
        {isSignupFormVisible && (
          <SignupEmailForm
            setIsLoginFormVisible={setIsLoginFormVisible}
            setIsSignupFormVisible={setIsSignupFormVisible}
            setIsForgotPasswordVisible={setIsForgotPasswordVisible}
            setCurrentUserEmail={setCurrentUserEmail}
          />
        )}
      </View>
      {(isLoginFormVisible ||
        isSignupFormVisible ||
        isForgotPasswordVisible) && (
        <Animated.View
          style={{padding: scale(20)}}
          className="w-full items-center"
          entering={SlideInDown}
          exiting={SlideOutDown}>
          <TouchableOpacity
            style={{
              height: scale(40),
              width: scale(40),
            }}
            className="rounded-full flex items-center justify-center border-1 border border-gray-300"
            onPress={() => {
              setIsLoginFormVisible(false);
              setIsSignupFormVisible(false);
              setIsForgotPasswordVisible(false);
            }}>
            <Icon name="angle-down" color="white" size={scale(20)} />
          </TouchableOpacity>
        </Animated.View>
      )}
      {!isLoginFormVisible &&
        !isSignupFormVisible &&
        !isForgotPasswordVisible && (
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            style={{
              padding: scale(32),
              paddingVertical: scale(45),
              gap: scale(15),
              borderTopEndRadius: 40,
              borderTopLeftRadius: 40,
            }}
            className="bg-gray-800/50">
            <TouchableOpacity
              style={{gap: scale(15), padding: scale(12)}}
              className="rounded-full bg-white flex flex-row items-center justify-center"
              onPress={() => {
                signIn();
              }}>
              <Icon name="google" size={scale(20)} color="black" />
              <Text
                style={{fontSize: scale(14)}}
                className="text-center font-semibold  text-black">
                Continue with google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{gap: scale(15), padding: scale(12)}}
              className="rounded-full bg-gray-800 flex flex-row items-center justify-center"
              onPress={() => {
                setIsLoginFormVisible(false);
                setIsSignupFormVisible(true);
                setIsForgotPasswordVisible(false);
              }}>
              <Icon name="envelope" size={scale(20)} color="white" />
              <Text
                style={{fontSize: scale(14)}}
                className="text-center font-semibold  text-white">
                Sign up with email
              </Text>
            </TouchableOpacity>
            <View className="h-[0.5px] rounded-full bg-gray-50/50 my-3 mx-6"></View>
            <TouchableOpacity
              style={{gap: scale(20), padding: scale(12)}}
              className="rounded-full border border-1 border-gray-400 flex flex-row items-center justify-center"
              onPress={() => {
                setIsLoginFormVisible(true);
                setIsSignupFormVisible(false);
                setIsForgotPasswordVisible(false);
              }}>
              <Text
                style={{fontSize: scale(14)}}
                className="text-center font-semibold  text-white">
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
    </View>
  );
};

export default Login;
