import {View, Dimensions, Image} from 'react-native';
import React from 'react';
import colors from '../utils/colors';

const {width: screenWidth} = Dimensions.get('window');
const ChatImage = ({imageUrl}: {imageUrl: string}) => {
  return (
    <View
      style={{alignSelf: 'flex-end', width: 'auto'}}
      className="rounded-3xl rounded-tl-none justify-start flex items-start h-100 w-100">
      <Image
        style={{
          width: screenWidth * 0.7,
          alignSelf: 'flex-end',
          display: 'flex',
          minHeight: screenWidth * 0.85,
          objectFit: 'cover',
          backgroundColor: colors.DarkBlue,
          borderRadius: 10,
        }}
        source={{uri: imageUrl}}
      />
    </View>
  );
};

export default ChatImage;
