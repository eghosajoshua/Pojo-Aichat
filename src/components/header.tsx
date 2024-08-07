import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useCallback, useState} from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {scale} from 'react-native-size-matters';
//@ts-ignore
import HeaderDropDown from './header-drop-down';

const Header = ({navigation}: {navigation: any}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const handleLayout = useCallback((e: any) => {
    let {height} = e.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  return (
    <View
      onLayout={handleLayout}
      style={{padding: scale(15)}}
      className="flex z-10 flex-row bg-[#0D0D0D] relative justify-between items-center">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{height: scale(20), width: scale(20)}}
            source={require('../../images/burger.png')}
          />
        </TouchableOpacity>
        <Text style={{fontSize: scale(20)}} className="text-white ml-6">
          ChatBot
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsDropdownOpen(prev => !prev)}
        className="px-4">
        <Icon name="ellipsis-vertical" size={scale(20)} color="white" />
      </TouchableOpacity>
      {isDropdownOpen && (
        <HeaderDropDown
          setIsDropdownOpen={setIsDropdownOpen}
          headerHeight={headerHeight}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default Header;
