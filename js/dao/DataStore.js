import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchGithubTrending } from './utils/getGithubTrending';

export const DATA_FLAG = {
  popular: 'popular',
  trending: 'trending',
};

export default class DataStore {
  saveData(url, data, callback) {
    if (!data || !url) {
      return;
    }

    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data), callback));
  }

  fetchData(url, flag) {
    return new Promise((resolve, reject) => {
      this.getLocalData(url)
        .then((wrapData) => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData);
          } else {
            this.fetchNetworkData(url, flag)
              .then((data) => {
                resolve(this._wrapData(data));
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((error) => {
          this.fetchNetworkData(url, flag)
            .then((data) => {
              resolve(this._wrapData(data));
            })
            .catch((err) => {
              reject(err);
            });
          reject(error);
        });
    });
  }

  getLocalData(url) {
    // return undefined;
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (err, result) => {
        if (!err) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.err(e);
          }
        } else {
          reject(err);
          console.error(err);
        }
      });
    });
  }

  fetchNetworkData(url, flag) {
    return new Promise((resolve, reject) => {
      if (flag !== DATA_FLAG.trending) {
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error(`Request ${url} failed`);
          })
          .then((resData) => {
            this.saveData(url, resData);
            resolve(resData);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        fetchGithubTrending(url)
          .then((res) => {
            if (!res) {
              throw new Error('Response data empty');
            }
            this.saveData(url, res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  static checkTimestampValid(timeStamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timeStamp);

    if (currentDate.getMonth() !== targetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== targetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() !== targetDate.getHours()) {
      return false;
    }
    return true;
  }

  _wrapData(data) {
    return { data, timestamp: new Date().getTime() };
  }
}
