import React, { useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-easy-toast';

import useDeepSelector from '../hooks/useDeepSelector';

import NavButton from '../components/NavButton';
import PopularItem from '../components/PopularItem';
import NavigationBar from '../components/NavigationBar';
import StyledSafeView from '../components/StyledSafeView';

import { PAGE_SIZE, REPO_URL, FAVORITE_POPULAR, TAGS } from '../constants';
import action from '../action';
import { shadeColor } from '../action/utils';

const QUERY_STR = '&sort=starts';

function PopularTab({ navigation, path, theme, tabName }) {
  const popular = useDeepSelector('popular');
  const favorite = useDeepSelector('favorite');
  const dispatch = useDispatch();
  const toastRef = useRef();

  const popularStore = popular[tabName] || {
    items: [],
    isLoading: false,
    projectModes: [],
    hideLoadingMore: false,
  };

  const favoriteStore = favorite[FAVORITE_POPULAR] || {
    keys: [],
    items: [],
    isLoading: false,
  };

  const getUrl = useCallback(() => {
    return REPO_URL + path + QUERY_STR;
  }, [path]);

  const loadData = (refresh) => {
    if (refresh) {
      dispatch(action.onLoadPopularData(tabName, getUrl(), PAGE_SIZE));
    } else {
      dispatch(
        action.onLoadMorePopularData(
          tabName,
          ++popularStore.pageIndex,
          PAGE_SIZE,
          popularStore.items,
          (message) => {
            toastRef.current.show(message, 1000);
          }
        )
      );
    }
  };

  useEffect(() => {
    dispatch(action.onLoadPopularData(tabName, getUrl(), PAGE_SIZE, true));
  }, [dispatch, getUrl, tabName]);

  useEffect(() => {
    dispatch(action.onLoadFavoriteItems(FAVORITE_POPULAR));
    dispatch(action.onLoadTheme());
  }, [dispatch]);

  const ListFooterComponent = () => {
    return popularStore.hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color={theme} />
        <Text style={[styles.indicator, { color: theme }]}>Loading More</Text>
      </View>
    );
  };

  const renderItem = (data) => {
    const isFavorite =
      favoriteStore.keys.indexOf(
        FAVORITE_POPULAR + '_' + data.item.full_name
      ) >= 0;
    return (
      <PopularItem
        item={data.item}
        isFavorite={isFavorite}
        onSelect={() =>
          navigation.navigate('DetailPage', {
            repo: data.item,
            flag: FAVORITE_POPULAR,
            isFavorite,
          })
        }
      />
    );
  };

  return (
    <View>
      <FlatList
        data={popularStore.projectModes || []}
        renderItem={(data) => renderItem(data)}
        keyExtractor={(item) => '' + item.id}
        refreshControl={
          <RefreshControl
            title="Loading"
            colors={[theme]}
            tintColor={theme}
            titleColor={theme}
            refreshing={popularStore.isLoading}
            onRefresh={() => {
              loadData(true);
            }}
          />
        }
        ListFooterComponent={ListFooterComponent}
        onEndReached={() => {
          loadData(false);
        }}
        onEndReachedThreshold={0.1}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

const PopularPage = ({ navigation }) => {
  // Ignore all log notifications:
  LogBox.ignoreAllLogs();
  const dispatch = useDispatch();
  const tags = useDeepSelector('languages')[TAGS] || [];
  const { theme } = useSelector((state) => state.theme);
  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    dispatch(action.onLoadLanguages(TAGS));
  }, [dispatch]);

  return (
    <StyledSafeView head headColor={theme}>
      <NavigationBar
        title="Popular"
        style={{
          backgroundColor: theme,
        }}
        rightButton={
          <NavButton
            onPress={() => {
              navigation.navigate('SearchPage');
            }}
            name="ios-search"
            color="#fff"
            size={24}
            style={styles.rightButton}
          />
        }
      />
      {tags.length > 0 && (
        <Tab.Navigator
          screenOptions={{
            tabBarItemStyle: { width: 110 },
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
          style={[{ backgroundColor: theme }]}
          tabBarScrollEnabled={true}
        >
          {tags.map(({ name: tabName, path, checked }, index) => {
            return tabName && checked ? (
              <Tab.Screen
                key={tabName}
                name={tabName.replace(/\s/g, '')}
                options={{
                  title: tabName,
                }}
              >
                {(props) => (
                  <PopularTab
                    {...props}
                    path={path}
                    theme={theme}
                    tabName={tabName}
                  />
                )}
              </Tab.Screen>
            ) : null;
          })}
        </Tab.Navigator>
      )}
    </StyledSafeView>
  );
};

const styles = StyleSheet.create({
  container: {},
  popular: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
    margin: 5,
  },
  rightButton: {
    marginRight: 10,
  },
});

export default PopularPage;
