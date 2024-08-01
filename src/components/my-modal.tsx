import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../utils/colors';

const {width: displayWidth} = Dimensions.get('screen');
const MyModal = ({
  modalVisible,
  setModalVisible,
  children,
  dismissible = true,
}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        dismissible && setModalVisible(!modalVisible);
      }}>
      <Pressable
        onPress={() => dismissible && setModalVisible(!modalVisible)}
        className="w-full h-full absolute bg-black/90 top-0 left-0"></Pressable>
      <View style={styles.centeredView} className="">
        <View style={styles.modalView} className="">
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    display: 'flex',
    width: displayWidth * 0.85,
    backgroundColor: colors.DarkGray,
    flexDirection: 'column',
    maxWidth: 450,
    marginHorizontal: 30,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MyModal;
