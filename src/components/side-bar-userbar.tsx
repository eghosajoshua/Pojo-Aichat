import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useContext} from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {StoreContext} from '../context/store';
import {scale} from 'react-native-size-matters';

const {height: screenHeight} = Dimensions.get('screen');
const {height: windowHeight} = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight || 24;
const bottomBarHeight = screenHeight - windowHeight - statusBarHeight;
const regex = /\([a-zA-Z]+\)/g;

function UserBar({navigation}: {navigation: any}) {
  const {
    store: {user},
  } = useContext(StoreContext);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('settings')}
      style={{marginBottom: bottomBarHeight + 30}}
      className=" w-full  flex flex-row justify-between items-center">
      <View
        style={{gap: 10}}
        className="flex flex-row mr-4  flex-1 overflow-hidden items-center">
        <Image
          style={{height: scale(35), width: scale(35)}}
          className="rounded-full"
          source={{
            uri:
              user?.user_metadata.avatar_url ??
              'https://lvoohwcdbziczdjtjycq.supabase.co/storage/v1/object/public/images/user.png',
          }}
        />
        <Text
          style={{fontSize: scale(14)}}
          numberOfLines={1}
          className="text-white  flex-1   ">
          {user?.user_metadata.name
            ? user?.user_metadata.name.replace(regex, '')
            : user.email}
        </Text>
      </View>
      <Icon name="chevron-right" size={20} color="white" />
    </TouchableOpacity>
  );
}

export default UserBar;
