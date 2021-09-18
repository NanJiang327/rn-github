/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import store from './js/store';

import InitNavigator from './js/navigator/AppNavigators';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      {/* <View style={styles.container}> */}
      <NavigationContainer>
        <InitNavigator />
      </NavigationContainer>
      {/* </View> */}
    </Provider>
  );
};

export default App;
