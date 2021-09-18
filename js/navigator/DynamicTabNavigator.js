import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import AntDesign from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FavoritePage from '../pages/FavoritePage';
import ProfilePage from '../pages/ProfilePage';
import TrendingPage from '../pages/TrendingPage';
import PopularPage from '../pages/PopularPage';

const Tab = createBottomTabNavigator();

const TABS = {
  PopularPage: {
    name: 'PopularPage',
    component: PopularPage,
    options: {
      tabBarLabel: 'Popular',
      tabBarIcon: ({ color, focused }) => (
        <MaterialIcons name="whatshot" size={26} style={{ color }} />
      ),
    },
  },
  TrendingPage: {
    name: 'TrendingPage',
    component: TrendingPage,
    options: {
      tabBarLabel: 'Trending',
      tabBarIcon: ({ color, focused }) => (
        <Ionicons name="trending-up" size={26} style={{ color }} />
      ),
    },
  },
  FavoritePage: {
    name: 'FavoritePage',
    component: FavoritePage,
    options: {
      tabBarLabel: 'Favorite',
      tabBarIcon: ({ color, focused }) => (
        <MaterialIcons name="favorite" size={26} style={{ color }} />
      ),
    },
  },
  ProfilePage: {
    name: 'ProfilePage',
    component: ProfilePage,
    options: ({ route, navigation }) => {
      return {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, focused }) => (
          <AntDesign name="user" size={26} style={{ color }} />
        ),
      };
    },
  },
};

export default function DynamicMainNavigator() {
  const theme = useSelector((state) => state.theme);

  return (
    <Tab.Navigator
      initialRouteName="PopularPage"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.theme,
      }}
    >
      {Object.values(TABS).map((tab) => (
        <Tab.Screen key={tab.name} {...tab} />
      ))}
    </Tab.Navigator>
  );
}
