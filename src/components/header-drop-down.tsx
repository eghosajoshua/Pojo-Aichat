import {Pressable, Dimensions, Share} from 'react-native';
import Animated, {FadeIn, FadeOutUp} from 'react-native-reanimated';
import CONTEXT_ACTIONS from '../context/actions';
import {StoreContext} from '../context/store';
import {useContext} from 'react';
import {scale} from 'react-native-size-matters';
import PopOverItems from './pop-over-items';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const HeaderDropDown = ({
  setIsDropdownOpen,
  headerHeight,
  navigation,
}: {
  setIsDropdownOpen: Function;
  headerHeight: number;
  navigation: any;
}) => {
  const {dispatch} = useContext(StoreContext);

  const handleShare = () => {
    Share.share({
      message:
        'Check out this app Pojo AI Chatbot - https://play.google.com/store/apps/details?id=com.pojoai.aichat',
      url: 'https://play.google.com/store/apps/details?id=com.pojoai.aichat',
    });
  };

  const handleNewChat = () => {
    dispatch({
      type: CONTEXT_ACTIONS.SET_CURRENT_CHAT_ID,
      payload: null,
    });
    dispatch({type: CONTEXT_ACTIONS.SET_CHAT_DATA, payload: []});
    setIsDropdownOpen(false);
  };

  const handleGoToSettings = () => navigation.navigate('settings');

  const dropDownItems = [
    {
      title: 'Settings',
      onPress: handleGoToSettings,
      icon: 'gear',
    },
    {
      title: 'New Chat',
      onPress: handleNewChat,
      icon: 'plus',
    },
    {
      title: 'Share',
      onPress: handleShare,
      icon: 'share',
    },
  ];

  return (
    <>
      <Pressable
        onPress={() => setIsDropdownOpen(false)}
        style={{width: screenWidth, height: screenHeight}}
        className="absolute top-0 left-0"></Pressable>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOutUp}
        style={{
          top: headerHeight + 1,
          minWidth: scale(150),
          padding: scale(8),
          borderRadius: 10,
        }}
        className="bg-[#0D0D0D] flex flex-col  absolute  right-1 ">
        <PopOverItems items={dropDownItems} />
      </Animated.View>
    </>
  );
};

export default HeaderDropDown;
