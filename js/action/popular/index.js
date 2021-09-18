import Types from '../types';
import DataStore, { DATA_FLAG } from '../../dao/DataStore';
import { handleData } from '../utils';

export function onLoadPopularData(storeName, url, pageSize, initLoading) {
  return (dispacth) => {
    if (!initLoading) {
      dispacth({ type: Types.POPULAR_REFRESH, storeName });
    }
    let dataStore = new DataStore();
    dataStore
      .fetchData(url, DATA_FLAG.popular) // async action
      .then((data) => {
        handleData(
          Types.POPULAR_REFRESH_SUCCESS,
          dispacth,
          storeName,
          data,
          pageSize
        );
      })
      .catch((e) => {
        console.error(e);
        dispacth({ type: Types.LOAD_POPULAR_FAIL, storeName, e });
      });
  };
}

export function onLoadMorePopularData(
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  callback
) {
  return (dispatch) => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        // Already loaded everything

        if (typeof callback === 'function') {
          callback('Nothing to load ✅');
        }

        dispatch({
          type: Types.LOAD_MORE_POPULAR_FAIL,
          error: 'Nothing to load',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray,
        });
      } else {
        let currentIndex =
          pageIndex * pageSize > dataArray.length
            ? dataArray.length
            : pageIndex * pageSize;

        dispatch({
          type: Types.LOAD_MORE_POPULAR_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, currentIndex),
        });
      }
    }, 500);
  };
}
