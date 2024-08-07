import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  TextInput,
} from 'react-native';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Formik} from 'formik';
import * as Yup from 'yup';
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
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const Login = ({navigation}: any) => {
  const {dispatch} = useContext(StoreContext) || {dispatch: null};
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [OTP, setOTP] = useState('');

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

  const handleEmailSignup = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (data.password !== data.confirmPassword) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'error',
        textBody: 'password and confirm password does not match',
        autoClose: 1000,
      });
      return;
    }
    try {
      const {data: user, error} = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error === null) {
        //confirm otp
        setCurrentUserEmail(data.email);
        setIsForgotPasswordVisible(true);
        setIsLoginFormVisible(false);
        setIsSignupFormVisible(false);
      } else {
        console.error(error, 'sign up error');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEmailLogin = async (loginDetails: {
    email: string;
    password: string;
  }) => {
    console.log(loginDetails);

    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: loginDetails.email,
        password: loginDetails.password,
      });

      if (error === null) {
        //sign in
        dispatch({type: CONTEXT_ACTIONS.SET_USER, payload: data.user});
        dispatch({type: CONTEXT_ACTIONS.SET_CHAT_HISTORY, payload: []});
        dispatch({type: CONTEXT_ACTIONS.SET_CURRENT_CHAT_ID, payload: null});
        dispatch({type: CONTEXT_ACTIONS.SET_CHAT_DATA, payload: []});
        navigation.navigate('home');
      } else {
        console.error(error, 'sign in error');
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleOTP = async () => {
    const {data, error} = await supabase.auth.verifyOtp({
      email: currentUserEmail,
      token: OTP,
      type: 'email',
    });

    console.log(data, error, '---otp---');

    if (error === null) {
      //sign in
      dispatch({type: CONTEXT_ACTIONS.SET_USER, payload: data.user});
      dispatch({type: CONTEXT_ACTIONS.SET_CHAT_HISTORY, payload: []});
      dispatch({type: CONTEXT_ACTIONS.SET_CURRENT_CHAT_ID, payload: null});
      dispatch({type: CONTEXT_ACTIONS.SET_CHAT_DATA, payload: []});
      navigation.navigate('home');
    }
  };

  const handleResendOTP = async () => {
    const {error} = await supabase.auth.resend({
      type: 'signup',
      email: currentUserEmail,
    });
    if (error === null) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Alert',
        textBody: 'OTP was sent successfully',
        autoClose: 1000,
      });
    }
  };

  return (
    <View className="flex flex-1 bg-black">
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View className="flex-1 items-center justify-center">
        {isForgotPasswordVisible && (
          <ResetPassword
            setOTP={setOTP}
            handleOTP={handleOTP}
            handleResendOTP={handleResendOTP}
          />
        )}
        {isLoginFormVisible && (
          <LoginForm
            setIsLoginFormVisible={setIsLoginFormVisible}
            setIsSignupFormVisible={setIsSignupFormVisible}
            setIsForgotPasswordVisible={setIsForgotPasswordVisible}
            handleEmailLogin={handleEmailLogin}
          />
        )}
        {isSignupFormVisible && (
          <SignupForm
            setIsLoginFormVisible={setIsLoginFormVisible}
            setIsSignupFormVisible={setIsSignupFormVisible}
            setIsForgotPasswordVisible={setIsForgotPasswordVisible}
            handleEmailSignup={handleEmailSignup}
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

const SignupForm = ({
  setIsLoginFormVisible,
  setIsSignupFormVisible,
  setIsForgotPasswordVisible,
  handleEmailSignup,
}: any) => {
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Too Short, 6 or more characters')
      .max(20, 'Too Long , less than 20 characters')
      .required('password cannot be empty'),
    confirmPassword: Yup.string()
      .min(6, 'Too Short, 6 or more characters')
      .max(20, 'Too Long , less than 20 characters')
      .required('confirm password cannot be empty'),
    email: Yup.string().email('Invalid email').required('Required'),
  });
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{gap: scale(20)}}
      className="w-[90%] max-w-[400px] flex flex-col">
      <Text
        style={{fontSize: scale(20)}}
        className="font-bold text-white text-center">
        Sign up
      </Text>
      <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        validationSchema={SignupSchema}
        onSubmit={values => handleEmailSignup(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View>
              <Text
                style={{fontSize: scale(12), paddingLeft: scale(16)}}
                className="text-gray-200 mb-2">
                Email
              </Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{
                  paddingHorizontal: scale(20),
                  paddingVertical: scale(12),
                  fontSize: scale(12),
                }}
                keyboardType="email-address"
                className="bg-gray-800 rounded-full"
                placeholder="enter email"
              />
              {errors.email && touched.email ? (
                <Text className="text-red-400 text-center">{errors.email}</Text>
              ) : null}
            </View>
            <View>
              <Text
                style={{fontSize: scale(12), paddingLeft: scale(16)}}
                className="text-gray-200 mb-2">
                Password
              </Text>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={{
                  paddingHorizontal: scale(20),
                  paddingVertical: scale(12),
                  fontSize: scale(12),
                }}
                keyboardType="email-address"
                className="bg-gray-800 rounded-full"
                placeholder="enter password"
              />
              {errors.password && touched.password ? (
                <Text className="text-red-400 text-center">
                  {errors.password}
                </Text>
              ) : null}
            </View>
            <View>
              <Text
                style={{fontSize: scale(12), paddingLeft: scale(16)}}
                className="text-gray-200 mb-2">
                Confirm password
              </Text>
              <TextInput
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                style={{
                  paddingHorizontal: scale(20),
                  paddingVertical: scale(12),
                  fontSize: scale(12),
                }}
                keyboardType="email-address"
                className="bg-gray-800 rounded-full "
                placeholder="re-enter password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text className="text-red-400 text-center">
                  {errors.confirmPassword}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={{gap: scale(20), padding: scale(12)}}
              className="rounded-full border border-1 border-gray-400 flex flex-row items-center justify-center "
              onPress={() => handleSubmit()}>
              <Text
                style={{fontSize: scale(14)}}
                className="text-center font-semibold  text-white">
                Sign up
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </Animated.View>
  );
};

const LoginForm = ({
  setIsLoginFormVisible,
  setIsSignupFormVisible,
  setIsForgotPasswordVisible,
  handleEmailLogin,
}: any) => {
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Too Short, 6 or more characters')
      .max(20, 'Too Long , less than 20 characters')
      .required('password cannot be empty'),
    email: Yup.string().email('Invalid email').required('Required'),
  });
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{gap: scale(20)}}
      className="w-[90%] max-w-[400px] flex flex-col">
      <Text
        style={{fontSize: scale(20)}}
        className="font-bold text-white text-center">
        Sign up
      </Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={SignupSchema}
        onSubmit={values => handleEmailLogin(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View>
              <Text
                style={{fontSize: scale(12), paddingLeft: scale(16)}}
                className="text-gray-200 mb-2">
                Email
              </Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{
                  paddingHorizontal: scale(20),
                  paddingVertical: scale(12),
                  fontSize: scale(12),
                }}
                keyboardType="email-address"
                className="bg-gray-800 rounded-full"
                placeholder="enter email"
              />
              {errors.email && touched.email ? (
                <Text className="text-red-400 text-center">{errors.email}</Text>
              ) : null}
            </View>
            <View>
              <Text
                style={{fontSize: scale(12), paddingLeft: scale(16)}}
                className="text-gray-200 mb-2">
                Password
              </Text>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={{
                  paddingHorizontal: scale(20),
                  paddingVertical: scale(12),
                  fontSize: scale(12),
                }}
                keyboardType="email-address"
                className="bg-gray-800 rounded-full"
                placeholder="enter password"
              />
              {errors.password && touched.password ? (
                <Text className="text-red-400 text-center">
                  {errors.password}
                </Text>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  setIsLoginFormVisible(false);
                  setIsSignupFormVisible(false);
                  setIsForgotPasswordVisible(true);
                }}
                className=" w-fit ml-auto mt-2 p-1">
                <Text style={{fontSize: scale(10)}}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{gap: scale(20), padding: scale(12)}}
              className="rounded-full border border-1 border-gray-400 flex flex-row items-center justify-center "
              onPress={() => handleSubmit()}>
              <Text
                style={{fontSize: scale(14)}}
                className="text-center font-semibold  text-white">
                Login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </Animated.View>
  );
};

const ResetPassword = ({handleOTP, setOTP, handleResendOTP}: any) => {
  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      className="w-[90%] max-w-[400px] flex flex-col">
      <Text
        style={{fontSize: scale(15), paddingLeft: scale(16)}}
        className="text-gray-200 mb-5">
        Enter confirmation code
      </Text>
      <TextInput
        onChangeText={val => setOTP(val)}
        style={{
          paddingHorizontal: scale(20),
          paddingVertical: scale(12),
          fontSize: scale(12),
        }}
        className="bg-gray-800 rounded-full"
        placeholder="enter OTP"
      />
      <TouchableOpacity
        onPress={handleResendOTP}
        className="mt-1 ml-auto mr-3 p-2">
        <Text style={{fontSize: scale(12)}}>Resend</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{gap: scale(20), padding: scale(12)}}
        className="rounded-full border border-1 mt-4 border-gray-400 flex flex-row items-center justify-center"
        onPress={handleOTP}>
        <Text
          style={{fontSize: scale(14)}}
          className="text-center font-semibold  text-white">
          Continue
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Login;
