import {
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {StoreContext} from '../context/store';
import CONTEXT_ACTIONS from '../context/actions';
import {useContext, useState} from 'react';
import {scale} from 'react-native-size-matters';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
/*  Supabase OTP imports, kept commented for restoration:
import {supabase} from '../utils/supabase';
import CONTEXT_ACTIONS from '../context/actions';
*/

const ConfirmEmail = ({
  navigation,
  currentUserEmail,
}: {
  navigation: any;
  currentUserEmail: string;
}) => {
  const [OTP, setOTP] = useState('');

  const {dispatch} = useContext(StoreContext) || {dispatch: null};

  /*  Supabase OTP verification:
  const handleOTPWithSupabase = async () => {
    const {data, error} = await supabase.auth.verifyOtp({
      email: currentUserEmail,
      token: OTP,
      type: 'email',
    });
    if (error === null) {
      dispatch({type: CONTEXT_ACTIONS.SET_USER, payload: data.user});
      navigation.navigate('home');
    }
  };

  const handleResendOTPWithSupabase = async () => {
    await supabase.auth.resend({type: 'signup', email: currentUserEmail});
  };
  */

  const handleOTP = () => {
    Alert.alert(
      'Portfolio Demo',
      'No account verification occurred. Demo data stays on this device.',
      [{text: 'Continue Demo', onPress: () => navigation.navigate('payment')}],
    );
  };

  const handleResendOTP = () => {
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: 'Demo App',
      textBody: 'No verification email was sent.',
      autoClose: 1000,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{width: '100%'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{alignItems: 'center'}}>
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
              color: 'white',
            }}
            className="bg-gray-800 rounded-full"
            placeholder="enter OTP"
            placeholderTextColor="gray"
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ConfirmEmail;
