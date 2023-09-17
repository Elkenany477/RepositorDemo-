/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import { store } from './Redux/Store/Store';
import TOPNAVIGATION from './Navigation';



const App = () => {
  return (
    <Provider store={store}>
      <TOPNAVIGATION />
    </Provider>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#FAFCFE",
  },

});

export default App;
