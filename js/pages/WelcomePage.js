import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import useTimeout from '../hooks/useSetTimeOut';

import NavigationUtils from '../utils/navigators';

export default function WelcomePage({ navigation }) {
  useTimeout(() => {
    SplashScreen.hide();
    NavigationUtils.restToHome(navigation);
  }, 1000);

  return (
    <View style={styles.container}>
      <Text>Welcome to my app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
