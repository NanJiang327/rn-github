import React from 'react';
import { View, Text, StatusBar, StyleSheet, Platform } from 'react-native';

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;

const NavigationBar = ({
  style,
  title,
  titleView,
  titleLayoutStyle,
  hide,
  statusBar = {
    barStyle: 'light-content',
    hidden: false,
  },
  rightButton,
  leftButton,
}) => {
  const renderButton = (button) => {
    return button ? (
      <View style={styles.navBarButton}>{button}</View>
    ) : (
      <View />
    );
  };

  return (
    <View style={[styles.container, style]}>
      <StatusBar {...statusBar} />
      <View style={styles.navBar}>
        {renderButton(leftButton)}
        <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
          {titleView ? (
            titleView()
          ) : (
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          )}
        </View>
        {renderButton(rightButton)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196f3',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  navBarButton: {
    alignItems: 'center',
  },
});

export default NavigationBar;
