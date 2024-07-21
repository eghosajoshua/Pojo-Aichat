import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import * as Colors from '../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome';

const {height: screenHeight} = Dimensions.get('screen');
const {height: windowHeight} = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight || 24;
const bottomBarHeight = screenHeight - windowHeight - statusBarHeight;

console.log(bottomBarHeight);
const SideBar = () => {
  const [showFavourites, setShowFavourites] = React.useState(false);
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: Colors.DarkGray,
      }}
      className="h-full w-full flex flex-col p-4 ">
      <Text className="text-2xl text-white ">History</Text>
      <View className="relative my-4">
        <View
          style={{top: '50%', transform: [{translateY: -10}]}}
          className="absolute  left-4  ">
          <Icon name="magnifying-glass" size={20} color="white" />
        </View>
        <TextInput
          className="bg-gray-500/20 p-4 rounded-2xl pl-12 text-white placeholder-slate-200 text-lg "
          placeholder="Search"
          placeholderTextColor="gray"
        />
      </View>
      {/* hr */}
      <View className="bg-gray-500/70 rounded-full h-1 mb-4"></View>
      {/* Favourites */}
      <View className="mb-4 ">
        <TouchableOpacity
          onPress={() => setShowFavourites(prev => !prev)}
          className="mb-2 flex flex-row justify-between items-center">
          <Text className="text-white text-xl">Favourites</Text>
          {!showFavourites ? (
            <Icon name="chevron-right" size={20} color="white" />
          ) : (
            <Icon name="chevron-down" size={20} color="white" />
          )}
        </TouchableOpacity>
        {showFavourites && (
          <ScrollView
            contentContainerStyle={{gap: 20}}
            className="mt-2  flex flex-col max-h-52 ">
            {/* list */}
            <View className="flex flex-row gap-5  items-center">
              <TouchableOpacity>
                <Icon2 name="star" size={18} color="yellow" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-white text-lg ">
                  Lorem ipsum dolor sit dsadid!
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-5  items-center">
              <TouchableOpacity>
                <Icon2 name="star" size={18} color="yellow" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-white text-lg ">
                  Lorem ipsum dolor sit dsadid!
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-5  items-center">
              <TouchableOpacity>
                <Icon2 name="star" size={18} color="yellow" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-white text-lg ">
                  Lorem ipsum dolor sit dsadid!
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-5  items-center">
              <TouchableOpacity>
                <Icon2 name="star" size={18} color="yellow" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-white text-lg ">
                  Lorem ipsum dolor sit dsadid!
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-5  items-center">
              <TouchableOpacity>
                <Icon2 name="star" size={18} color="yellow" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-white text-lg ">
                  Lorem ipsum dolor sit dsadid!
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-5  items-center">
              <TouchableOpacity>
                <Icon2 name="star" size={18} color="yellow" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-white text-lg ">
                  Lorem ipsum dolor sit dsadid!
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
      {/* hr */}
      <View className="bg-gray-500/70 rounded-full h-1 mb-4"></View>
      {/* history */}
      <ScrollView
        contentContainerStyle={{display: 'flex', gap: 20}}
        className="flex-1 mb-4">
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-5  items-center">
          <TouchableOpacity>
            <Icon2 name="star" size={18} color="yellow" />
            <Icon2 name="star-o" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-lg ">
              Lorem ipsum dolor sit dsadid!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* hr */}
      <View className="bg-gray-500/70 rounded-full h-1 mb-4"></View>
      <TouchableOpacity
        style={{marginBottom: bottomBarHeight + 30}}
        className="my-4 w-full  flex flex-row justify-between items-center">
        <View className="flex flex-row mr-4 gap-4 flex-1 overflow-hidden items-center">
          <Image
            className="h-12 w-12 rounded-full"
            source={require('../../images/user.jpg')}
          />
          <Text numberOfLines={1} className="text-white   text-xl flex-1   ">
            Eghosa Joshua
          </Text>
        </View>
        <Icon name="chevron-right" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SideBar;
