import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITE_KEY_PREFIX } from '../constants';

export default class FavoriteStore {
  constructor(flag) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }

  async saveFavoriteItem(key, value) {
    try {
      const item = await AsyncStorage.getItem(key);
      if (!item) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        this.updateFavoriteKey(key, true);
      } else {
        throw new Error('item exist!');
      }
    } catch (e) {
      console.error('fail to save item!', e);
    }
  }

  async removeFavoriteItem(key) {
    const item = await AsyncStorage.getItem(key);
    if (item) {
      try {
        await AsyncStorage.removeItem(key);
        this.updateFavoriteKey(key, false);
        return true;
      } catch (e) {
        console.error('fail to remove item');
        return false;
      }
    }
    return false;
  }

  //favortie_popular: [indi_key]
  updateFavoriteKey(key, isAdd) {
    AsyncStorage.getItem(this.favoriteKey, (err, result) => {
      if (!err) {
        let favoriteKeys = result ? JSON.parse(result) : [];

        let index = favoriteKeys.indexOf(key);

        if (isAdd) {
          if (index === -1) {
            favoriteKeys.push(key);
          }
        } else {
          if (index !== -1) {
            favoriteKeys.splice(index, 1);
          }
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      }
    });
  }

  getFavoriteKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (err, result) => {
        if (!err) {
          try {
            resolve(JSON.parse(result));
          } catch (error) {
            reject(error);
          }
        } else {
          reject(err);
        }
      });
    });
  }

  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys()
        .then((keys) => {
          let items = [];

          if (keys) {
            AsyncStorage.multiGet(keys, (err, results) => {
              if (!err) {
                results.map((item, idx) => {
                  let value = item[1];
                  let key = item[0];

                  if (value) {
                    items.push({
                      key: key,
                      value: JSON.parse(value),
                    });
                  }
                });

                resolve({ items, keys });
              } else {
                reject(err);
              }
            });
          } else {
            resolve({ items, keys: [] });
          }
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
}
