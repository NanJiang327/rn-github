import Types from '../types';
import LanguageStore from '../../dao/LanguageStore';

export function onLoadLanguages(flag) {
  return (dispacth) => {
    const favoriteStore = new LanguageStore(flag);

    favoriteStore
      .fetch()
      .then((data) => {
        dispacth({
          type: Types.LOAD_LANGUAGES_SUCCESS,
          data,
          flag,
        });
      })
      .catch((e) => {
        console.error('fail to load favorite', e);
        dispacth({ type: Types.LOAD_LANGUAGES_FAIL, e, flag });
      });
  };
}

export function saveLanguages(flag, data) {
  return (dispacth) => {
    const favoriteStore = new LanguageStore(flag);

    if (favoriteStore.save(data)) {
      dispacth({
        type: Types.SAVE_LANGUAGES_SUCCESS,
        data,
        flag,
      });
    } else {
      dispacth({
        type: Types.SAVE_LANGUAGES_FAIL,
      });
    }
  };
}
