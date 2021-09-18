import Types from '../action/types';

const defaultState = {};

export default function popularReducer(state = defaultState, action) {
  switch (action.type) {
    case Types.POPULAR_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
          isLoading: false,
        },
      };
    case Types.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          isLoading: true,
        },
      };
    case Types.POPULAR_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        },
      };

    case Types.LOAD_MORE_POPULAR_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
          isLoading: false,
        },
      };
    case Types.LOAD_MORE_POPULAR_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
          isLoading: false,
        },
      };
    default:
      return state;
  }
}
