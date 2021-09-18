import Types from '../types';
import ThemeStore from '../../dao/ThemeStore';

export function onLoadTheme() {
  return (dispacth) => {
    const favoriteStore = new ThemeStore();

    favoriteStore
      .fetch()
      .then((data) => {
        if (data) {
          dispacth({
            type: Types.LOAD_THEME_SUCCESS,
            data,
          });
        } else {
          dispacth({ type: Types.LOAD_THEME_FAIL });
        }
      })
      .catch((e) => {
        console.error('fail to load favorite', e);
        dispacth({ type: Types.LOAD_THEME_FAIL, e });
      });
  };
}

export function onThemeChange(theme) {
  return (dispatch) => {
    const themeStore = new ThemeStore();
    if (themeStore.save(theme)) {
      dispatch({
        type: Types.SAVE_THEME_SUCCESS,
        data: theme,
      });
    } else {
      dispatch({
        type: Types.SAVE_THEME_FAIL,
      });
    }
  };
}
