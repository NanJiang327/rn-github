import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import HTMLView from 'react-native-htmlview';

import { FAVORITE_TRENDING } from '../constants';
import action from '../action';

import FavoriteItem from './FavoriteItem';

const TrendingItem = ({ item, onSelect, isFavorite, theme }) => {
  const dispatch = useDispatch();
  const favoriteKey = FAVORITE_TRENDING + '_' + item.full_name;
  if (!item?.owner) {
    return null;
  }

  const onFavoritePress = () => {
    if (isFavorite) {
      dispatch(action.removeFavoriteItem(FAVORITE_TRENDING, favoriteKey));
    } else {
      dispatch(action.addFavoriteItem(FAVORITE_TRENDING, favoriteKey, item));
    }
  };

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.full_name}</Text>
        <HTMLView
          value={item.description}
          onLinkPress={(url) => {}}
          stylesheet={{
            p: styles.description,
            a: styles.description,
          }}
        />
        <Text style={styles.itemDescription}>{item.currentPeriodStars}</Text>
        <View style={styles.detailContainer}>
          <View style={styles.authorContainer}>
            <Text>Built by: </Text>
            {item.builtBy.map((contributors) => (
              <Image
                key={contributors.avatar}
                source={{ uri: contributors.avatar }}
                style={styles.authorImage}
              />
            ))}
          </View>
          <FavoriteItem
            isFavorite={isFavorite}
            onFavoritePress={onFavoritePress}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: '#808080',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2, // Android shadow
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorImage: { height: 22, width: 22, marginLeft: 5 },
});

export default TrendingItem;
