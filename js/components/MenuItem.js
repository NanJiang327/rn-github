import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GlobalStyles } from '../constants';

const MenuItem = ({ menu, theme = '#678', onPress }) => {
  if (!menu) {
    return null;
  }
  const { icon, size, name, subMenu } = menu;

  return (
    <>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          onPress(menu);
        }}
      >
        <View style={styles.item}>
          <MaterialCommunityIcons
            name={icon}
            size={size || 18}
            color={theme}
            style={styles.itemIcon}
          />
          <Text> {name}</Text>
        </View>
        <MaterialCommunityIcons
          name={subMenu ? 'chevron-right' : 'chevron-right'}
          size={16}
          style={styles.moreIcon}
        />
      </TouchableOpacity>
      <View style={GlobalStyles.underline} />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 10,
  },
  moreIcon: {
    marginRight: 10,
    alignSelf: 'center',
  },
});

export default MenuItem;
