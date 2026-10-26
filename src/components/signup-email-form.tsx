import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Formik} from 'formik';
import * as Yup from 'yup';
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
/*  remote signup imports, kept commented for restoration:
import {supabase} from '../utils/supabase';
import env from '../utils/env';
*/

const SignupEmailForm = ({
  navigation,
  setCurrentUserEmail,
  setIsForgotPasswordVisible,
  setIsLoginFormVisible,
  setIsSignupFormVisible,
}: {
  navigation: any;
  setCurrentUserEmail: Function;
  setIsForgotPasswordVisible: Function;
  setIsLoginFormVisible: Function;
  setIsSignupFormVisible: Function;
}) => {
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
    /*  Supabase signup flow:
    try {
      const {error} = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error === null) {
        setCurrentUserEmail(data.email);
        setIsForgotPasswordVisible(true);
        setIsLoginFormVisible(false);
        setIsSignupFormVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
    */

    setCurrentUserEmail(data.email);
    Alert.alert(
      'Portfolio Demo',
      'No account was created. Your signup details are not saved or sent anywhere.',
      [{text: 'Continue Demo', onPress: () => navigation.navigate('payment')}],
    );
  };

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
                  color: 'white',
                }}
                keyboardType="email-address"
                className="bg-gray-800 rounded-full"
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
                  color: 'white',
                }}
                keyboardType="email-address"
                className="bg-gray-800 rounded-full"
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
                  color: 'white',
                }}
                keyboardType="email-address"
                className="bg-gray-800 rounded-full "
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
export default SignupEmailForm;
