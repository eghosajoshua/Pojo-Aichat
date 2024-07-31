import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {supabase} from '../utils/supabase';
import env from '../utils/env';
import {StoreContext, ACTIONS} from '../utils/store';
import {useContext} from 'react';

const Login = ({navigation}: any) => {
  const {dispatch} = useContext(StoreContext) || {dispatch: null};

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
          dispatch({type: ACTIONS.SET_USER, payload: data.session.user});
          dispatch({type: ACTIONS.SET_CHAT_HISTORY, payload: []});
          dispatch({type: ACTIONS.SET_CURRENT_CHAT_ID, payload: null});
          dispatch({type: ACTIONS.SET_CHAT_DATA, payload: []});
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
    <View>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View className="h-full bg-black">
        <ScrollView className="">
          <Text className="text-4xl text-black m-auto">3</Text>
        </ScrollView>
        <TouchableOpacity
          className="p-8 mb-8"
          onPress={() => {
            signIn();
          }}>
          <LinearGradient
            start={{x: 0.5, y: 0.25}}
            end={{x: 0.5, y: 1.0}}
            colors={['white', 'white']}
            style={{gap: 20}}
            className="p-4 rounded-lg flex flex-row items-center justify-center">
            <Icon name="google" size={24} color="black" />
            <Text className="text-center font-semibold text-xl text-black">
              Sign in with google
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
