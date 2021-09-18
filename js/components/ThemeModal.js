import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  Modal,
  Platform,
  Text,
  TouchableHighlight,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GlobalStyles, ThemeFlags } from '../constants';
import action from '../action';

const TrendingModal = ({ visible, onRequestClose }) => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const themeBlock = (key) => {
    const selectedTheme = theme === ThemeFlags[key];
    return (
      <TouchableHighlight
        style={styles.blockItem}
        underlayColor="white"
        onPress={() => {
          if (!selectedTheme) {
            dispatch(action.onThemeChange(ThemeFlags[key]));
          }
          onRequestClose();
        }}
      >
        <View style={[{ backgroundColor: ThemeFlags[key] }, styles.themeItem]}>
          {selectedTheme && (
            <MaterialCommunityIcons color="#fff" size={24} name="check" />
          )}
          <Text style={styles.themeText}>{key}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderThemeBlocks = () => {
    const themeKeys = Object.keys(ThemeFlags);
    const blocks = [];
    for (let i = 0; i < themeKeys.length; i += 3) {
      const keyOne = themeKeys[i],
        keyTwo = themeKeys[i + 1],
        keyThree = themeKeys[i + 2];
      blocks.push(
        <View key={i} style={styles.blockContainer}>
          {themeBlock(keyOne)}
          {themeBlock(keyTwo)}
          {themeBlock(keyThree)}
        </View>
      );
    }
    return blocks;
  };

  return (
    <View style={GlobalStyles.root_container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          onRequestClose();
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView>{renderThemeBlocks()}</ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flex: 1,
    alignItems: 'center',
  },
  blockContainer: {
    flexDirection: 'row',
  },
  blockItem: {
    flex: 1,
  },
  themeItem: {
    flex: 1,
    height: 120,
    margin: 3,
    padding: 3,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 40 : 25,
    marginBottom: Platform.OS === 'ios' ? 35 : 65,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 3,
    shadowColor: '#808080',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 3,
  },
  themeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default TrendingModal;
