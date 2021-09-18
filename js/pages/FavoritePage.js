import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  FlatList,
  RefreshControl,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux';
import useDeepSelector from '../hooks/useDeepSelector';

import PopularItem from '../components/PopularItem';
import TrendingItem from '../components/TrendingItem';
import NavigationBar from '../components/NavigationBar';
import StyledSafeView from '../components/StyledSafeView';

import {
  FAVORITE_KEY_PREFIX,
  GlobalStyles,
  FAVORITE_POPULAR,
  FAVORITE_TRENDING,
} from '../constants';
import action from '../action';
import { shadeColor } from '../action/utils';

function FavoriteTab({ navigation, theme, tabName }) {
  const favorite = useDeepSelector('favorite');
  const dispatch = useDispatch();

  const store = favorite[FAVORITE_KEY_PREFIX + tabName] || {
    items: [],
    isLoading: false,
  };

  const loadData = () => {
    dispatch(action.onLoadFavoriteItems(FAVORITE_KEY_PREFIX + tabName));
  };

  useEffect(() => {
    dispatch(action.onLoadFavoriteItems(FAVORITE_KEY_PREFIX + tabName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = (data) => {
    const Component = tabName === 'popular' ? PopularItem : TrendingItem;
    const isFavorite =
      store.keys.indexOf(
        `${FAVORITE_KEY_PREFIX + tabName}_${data.item.value.full_name}`
      ) >= 0;
    return (
      <Component
        item={data.item.value}
        isFavorite={isFavorite}
        onSelect={() =>
          navigation.navigate('DetailPage', {
            repo: data.item.value,
            flag: tabName === 'popular' ? FAVORITE_POPULAR : FAVORITE_TRENDING,
            isFavorite,
          })
        }
      />
    );
  };

  return (
    <View style={GlobalStyles.root_container}>
      {store.items?.length > 0 ? (
        <FlatList
          data={store.items || []}
          renderItem={(data) => renderItem(data)}
          keyExtractor={(item) => '' + item.value.full_name}
          refreshControl={
            <RefreshControl
              title="Loading"
              colors={[theme]}
              tintColor={theme}
              titleColor={theme}
              refreshing={store.isLoading}
              onRefresh={loadData}
            />
          }
        />
      ) : (
        <View style={styles.textContainer}>
          <Text>You don't have any favorite {tabName} repos</Text>
        </View>
      )}
    </View>
  );
}

const FavoritePage = () => {
  // Ignore all log notifications:
  LogBox.ignoreAllLogs();
  const Tab = createMaterialTopTabNavigator();
  const [tabNames] = useState(['popular', 'trending']);
  const { theme } = useSelector((state) => state.theme);

  return (
    <StyledSafeView head headColor={theme}>
      <NavigationBar
        title="Favorite"
        style={{
          backgroundColor: theme,
        }}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: { width: GlobalStyles.windowWidth / 2 },
          tabBarStyle: { backgroundColor: theme },
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            height: 5,
            backgroundColor: shadeColor(theme, 45),
          },
          tabBarLabelStyle: styles.labelStyle,
          tabBarOptions: { upperCaseLabel: false },
          lazy: true,
        }}
        initialLayout={{ width: GlobalStyles.windowWidth }}
        style={[{ backgroundColor: theme }]}
      >
        {tabNames.map((tabName, index) => (
          <Tab.Screen
            key={tabName}
            name={tabName.replace(/\s/g, '')}
            options={{
              title: tabName,
            }}
          >
            {(props) => (
              <FavoriteTab {...props} tabName={tabName} theme={theme} />
            )}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </StyledSafeView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popular: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  indicatorStyle: {
    height: 6,
  },
  labelStyle: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 6,
  },
  indicatorContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  indicator: {
    color: '#E49B0F',
    margin: 5,
  },
});

export default FavoritePage;
