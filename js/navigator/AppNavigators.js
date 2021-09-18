import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import WebViewPage from '../pages/WebViewPage';
import AuthorPage from '../pages/AuthorPage';
import CustomTagPage from '../pages/CustomTagPage';
import TagSortingPage from '../pages/TagSortingPage';
import SearchPage from '../pages/SearchPage';
import CodePushPage from '../pages/CodePushPage';

const Stack = createStackNavigator();

export default function InitNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
      }}
      initialRouteName="WelcomePage"
    >
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebViewPage"
        component={WebViewPage}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AuthorPage"
        component={AuthorPage}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomTagPage"
        component={CustomTagPage}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TagSortingPage"
        component={TagSortingPage}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CodePushPage"
        component={CodePushPage}
        screenOptions={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
