import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FavoriteItem = ({ isFavorite, onFavoritePress }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <TouchableOpacity
      onPress={onFavoritePress}
      underlayColor="transparent"
      style={styles.favoriteIconContainer}
    >
      <MaterialIcons
        name={isFavorite ? 'favorite' : 'favorite-border'}
        size={26}
        style={isFavorite ? styles.favoriteIcon : { color: theme }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteIcon: {
    color: '#ff748c',
  },
});

export default FavoriteItem;
