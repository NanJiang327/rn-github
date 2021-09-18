import Types from '../action/types';

const defaultState = {};

export default function favoriteReducer(state = defaultState, action) {
  switch (action.type) {
    case Types.LOAD_FAVORITE_ITEMS_SUCCESS:
      return {
        ...state,
        [action.flag]: {
          ...state[action.flag],
          isLoading: false,
          items: action.data.items,
          keys: action.data.keys,
        },
      };
    case Types.ADD_FAVORITE_ITEM_SUCCESS:
      return {
        ...state,
        [action.flag]: {
          isLoading: false,
          items: [...state[action.flag].items, action.item],
          keys: [...state[action.flag].keys, action.item.key],
        },
      };
    case Types.REMOVE_FAVORITE_ITEM_SUCCESS:
      return {
        ...state,
        [action.flag]: {
          isLoading: false,
          items: state[action.flag].items.filter(
            (item) => item.key !== action.item.key
          ),
          keys: state[action.flag].keys.filter(
            (item) => item !== action.item.key
          ),
        },
      };
    case Types.REMOVE_FAVORITE_ITEMS_FAIL:
    case Types.LOAD_FAVORITE_ITEMS_FAIL:
    case Types.LOAD_FAVORITE_ITEM_KEYS_FAIL:
    default:
      return state;
  }
}
