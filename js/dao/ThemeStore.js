import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME = 'THEME';
export default class ThemeStore {
  fetch() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(THEME, (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          resolve(JSON.parse(result));
        } catch (e) {
          reject(error);
        }
      });
    });
  }

  async save(objectData) {
    let stringData = JSON.stringify(objectData);
    try {
      await AsyncStorage.setItem(THEME, stringData);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
