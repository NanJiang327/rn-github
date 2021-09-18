import Types from '../types';
import FavoriteStore from '../../dao/FavoriteStore';

export function onLoadFavoriteItems(flag) {
  return (dispacth) => {
    const favoriteStore = new FavoriteStore(flag);

    favoriteStore
      .getAllItems()
      .then((res) => {
        dispacth({
          type: Types.LOAD_FAVORITE_ITEMS_SUCCESS,
          data: res,
          flag,
        });
      })
      .catch((e) => {
        console.error('fail to load favorite', e);
        dispacth({ type: Types.LOAD_FAVORITE_ITEMS_FAIL, e, flag });
      });
  };
}

export function addFavoriteItem(flag, key, value) {
  return (dispacth) => {
    const favoriteStore = new FavoriteStore(flag);
    favoriteStore
      .saveFavoriteItem(key, value)
      .then(() => {
        dispacth({
          type: Types.ADD_FAVORITE_ITEM_SUCCESS,
          item: { key, value },
          flag,
        });
      })
      .catch((e) => {
        dispacth({
          type: Types.ADD_FAVORITE_ITEM_FAIL,
        });
      });
  };
}

export function removeFavoriteItem(flag, key) {
  return (dispacth) => {
    const favoriteStore = new FavoriteStore(flag);

    if (favoriteStore.removeFavoriteItem(key)) {
      dispacth({
        type: Types.REMOVE_FAVORITE_ITEM_SUCCESS,
        item: { key },
        flag,
      });
    } else {
      dispacth({
        type: Types.REMOVE_FAVORITE_ITEM_FAIL,
      });
    }
  };
}
