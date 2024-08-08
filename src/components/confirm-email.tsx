import {Text, TouchableOpacity, TextInput} from 'react-native';
import {supabase} from '../utils/supabase';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import {useContext, useState} from 'react';
import {scale} from 'react-native-size-matters';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const ConfirmEmail = ({
  navigation,
  currentUserEmail,
}: {
  navigation: any;
  currentUserEmail: string;
}) => {
  const [OTP, setOTP] = useState('');

  const {dispatch} = useContext(StoreContext) || {dispatch: null};

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

export default ConfirmEmail;
