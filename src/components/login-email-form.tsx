import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import {useContext} from 'react';
import {scale} from 'react-native-size-matters';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
/*  remote login imports kept for restoration:
import {supabase} from '../utils/supabase';
*/

const LoginEmailForm = ({
  setIsLoginFormVisible,
  setIsSignupFormVisible,
  setIsForgotPasswordVisible,
  navigation,
}: any) => {
  const {dispatch} = useContext(StoreContext) || {dispatch: null};

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Too Short, 6 or more characters')
      .max(20, 'Too Long , less than 20 characters')
      .required('password cannot be empty'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  /*  Supabase email login:
  const handleEmailLoginWithSupabase = async (loginDetails) => {
    const {data, error} = await supabase.auth.signInWithPassword(loginDetails);
    if (error === null) {
      dispatch({type: CONTEXT_ACTIONS.SET_USER, payload: data.user});
      navigation.navigate('home');
    }
  };
  */

  const handleEmailLogin = (loginDetails: {
    email: string;
    password: string;
  }) => {
    dispatch({
      type: CONTEXT_ACTIONS.SET_USER,
      payload: {
        id: 'portfolio-demo-user',
        email: loginDetails.email,
        user_metadata: {name: 'Demo User', avatar_url: null},
      },
    });
    Alert.alert(
      'Portfolio Demo',
      'No sign-in occurred. Your demo session is saved locally on this device.',
      [{text: 'Continue', onPress: () => navigation.navigate('payment')}],
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

export default LoginEmailForm;
