import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';

import { PROFILE_MENUS, GlobalStyles, LANGUAGES, TAGS } from '../constants';

import NavigationBar from '../components/NavigationBar';
import MenuItem from '../components/MenuItem';
import ThemeModal from '../components/ThemeModal';
import StyledSafeView from '../components/StyledSafeView';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilePage({ navigation }) {
  const [modalShow, setModalShow] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  const closeModal = useCallback(() => {
    setModalShow(false);
  }, []);

  const onPress = (item) => {
    switch (item.name) {
      case 'Documentaion':
        navigation.navigate('WebViewPage', {
          initUrl: 'https://reactnative.dev/docs/getting-started',
          title: 'Documentaion',
        });
        break;
      case 'Author':
        navigation.navigate('AuthorPage', {
          author: 'Aaron Jiang',
          subMenu: item.subMenu,
        });
        break;
      case 'Custom Tags':
      case 'Custom Languages':
        navigation.navigate('CustomTagPage', {
          title: item.name,
          flag: item.name === 'Custom Tags' ? TAGS : LANGUAGES,
        });
        break;
      case 'Tag Orders':
      case 'Language Orders':
        navigation.navigate('TagSortingPage', {
          title: item.name,
          flag: item.name === 'Tag Orders' ? TAGS : LANGUAGES,
        });
        break;
      case 'Custom Theme':
        setModalShow(true);
        break;
      case 'Clear Storage':
        Alert.alert(
          'Warning',
          'You are about to delete the storage, you will lost you saved theme, tags and favorite items',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                AsyncStorage.clear();
              },
            },
          ]
        );
        break;
      case 'Code Push':
        navigation.navigate('CodePushPage');
        break;
    }
  };
  return (
    <StyledSafeView head headColor={theme}>
      <NavigationBar
        title="Profile"
        statusBar={{
          backgroundColor: theme,
          barStyle: 'light-content',
        }}
        style={[{ backgroundColor: theme }]}
      />
      <ScrollView alwaysBounceVertical={true} style={styles.scrollView}>
        {PROFILE_MENUS.map((menuItem, index) => (
          <View key={index + menuItem.type}>
            {<Text style={styles.menuTitle}>{menuItem.type}</Text>}
            {menuItem.menu.map((menu) => (
              <MenuItem
                key={menu.name}
                onPress={onPress}
                menu={menu}
                theme={theme}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <ThemeModal visible={modalShow} onRequestClose={closeModal} />
    </StyledSafeView>
  );
}

const styles = StyleSheet.create({
  profile: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  leftButton: {
    padding: 8,
    paddingLeft: 12,
  },
  rigthButton: {
    padding: 8,
    paddingRight: 12,
  },
  menuTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    color: '#777',
  },
});
