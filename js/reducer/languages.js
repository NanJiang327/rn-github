import Types from '../action/types';
import { LANGUAGES } from '../constants';

const defaultState = {
  tags: [],
  languages: [],
};

export default function languageReducer(state = defaultState, action) {
  switch (action.type) {
    case Types.LOAD_LANGUAGES_SUCCESS:
    case Types.SAVE_LANGUAGES_SUCCESS:
      if (action.flag === LANGUAGES) {
        return {
          ...state,
          languages: action.data,
        };
      } else {
        return {
          ...state,
          tags: action.data,
        };
      }
    case Types.LOAD_LANGUAGES_FAIL:
    case Types.SAVE_LANGUAGES_FAIL:
    default:
      return state;
  }
}
