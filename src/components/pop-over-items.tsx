import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {scale} from 'react-native-size-matters';

const PopOverItems = ({
  items,
}: {
  items: {title: string; icon: string; onPress: Function; iconColor?: string}[];
}) => {
  return items.map((item, index) => (
    <TouchableOpacity
      key={item.title}
      onPress={event => item.onPress(event)}
      style={{
        padding: scale(8),
        gap: scale(10),
        marginTop: index > 0 ? scale(10) : 0,
        borderRadius: 10,
      }}
      className="flex flex-row items-center bg-gray-500/5 ">
      <Icon
        color={item.iconColor ?? 'white'}
        name={item.icon}
        size={scale(15)}
      />
      <Text style={{fontSize: scale(15)}} className="text-white ">
        {item.title}
      </Text>
    </TouchableOpacity>
  ));
};

export default PopOverItems;
