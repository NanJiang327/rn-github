import AsyncStorage from '@react-native-async-storage/async-storage';
import langs from '../../res/data/langs';
import tags from '../../res/data/tags';
import { LANGUAGES } from '../constants';

export default class LanguageStore {
  constructor(flag) {
    this.flag = flag;
  }

  fetch() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.flag, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          let data = this.flag === LANGUAGES ? langs : tags;
          this.save(data);
          resolve(data);
        } else {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(error);
          }
        }
      });
    });
  }

  async save(objectData) {
    let stringData = JSON.stringify(objectData);
    try {
      await AsyncStorage.setItem(this.flag, stringData);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
