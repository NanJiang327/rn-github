import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const StyledSafeView = ({
  customSafeView,
  head,
  footer,
  headColor,
  footerColor,
  children,
  style,
}) => {
  const { hasNotch } = DeviceInfo;

  return customSafeView ? (
    <View style={[styles.container, style]}>
      {!hasNotch() || !head ? null : (
        <View style={[styles.topArea, { backgroundColor: headColor }]} />
      )}
      {children}
      {!footer ? null : (
        <View style={[styles.bottomArea, { backgroundColor: footerColor }]} />
      )}
    </View>
  ) : (
    <>
      <SafeAreaView style={[styles.flexHead, { backgroundColor: headColor }]} />
      <SafeAreaView style={styles.flexBody}>{children}</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexHead: {
    flex: 0,
  },
  flexBody: {
    flex: 1,
  },
  topArea: {
    height: 44,
  },
  bottomArea: {
    height: 34,
    backgroundColor: 'red',
  },
});

export default StyledSafeView;
