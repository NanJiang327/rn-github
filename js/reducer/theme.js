import Types from '../action/types';

const defaultState = {
  theme: '#2196F3',
};

export default function themeReducer(state = defaultState, action) {
  switch (action.type) {
    case Types.LOAD_THEME_SUCCESS:
    case Types.SAVE_THEME_SUCCESS:
      return {
        theme: action.data,
      };
    case Types.LOAD_THEME_FAIL:
    case Types.SAVE_THEME_FAIL:
    default:
      return state;
  }
}
