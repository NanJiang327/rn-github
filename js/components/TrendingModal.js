import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import MaerialIcons from 'react-native-vector-icons/MaterialIcons';

import { TRENDING_PERIOD, GlobalStyles } from '../constants';

const ThemeModal = ({ visible, onRequestClose, onSelect }) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          onRequestClose();
        }}
      >
        <TouchableOpacity style={styles.container} onPress={onRequestClose}>
          <MaerialIcons name="arrow-drop-up" size={36} style={styles.icon} />
          <View style={styles.contentCotntainer}>
            {Object.keys(TRENDING_PERIOD).map((key, index) => {
              const time = TRENDING_PERIOD[key];
              return (
                <TouchableOpacity
                  key={time.name}
                  onPress={() => {
                    onSelect && onSelect(key);
                  }}
                  underlayColor="transparent"
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{time.name}</Text>
                  </View>
                  {index !== Object.keys(TRENDING_PERIOD).length - 1 ? (
                    <View style={GlobalStyles.underline} />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    backgroundColor: 'rgba(1,1,1,0.5)',
    flex: 1,
    alignItems: 'center',
  },
  contentCotntainer: {
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 3,
  },
  icon: {
    marginTop: 40,
    color: '#fff',
    padding: 0,
    margin: -15,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26,
  },
});

export default ThemeModal;
