import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux';

import MaerialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-easy-toast';

import action from '../action';

import TrendingItem from '../components/TrendingItem';
import NavigationBar from '../components/NavigationBar';
import TrendingModal from '../components/TrendingModal';
import StyledSafeView from '../components/StyledSafeView';

import useDeepSelector from '../hooks/useDeepSelector';

import {
  TRENDING_PERIOD,
  PAGE_SIZE,
  TRENDING_URL,
  FAVORITE_TRENDING,
  LANGUAGES,
} from '../constants';
import { shadeColor } from '../action/utils';

const TrendingTab = ({ navigation, tabName, path, theme, trendingSince }) => {
  const trending = useDeepSelector('trending');
  const favorite = useDeepSelector('favorite');
  const dispatch = useDispatch();
  const toastRef = useRef();

  const store = trending[tabName] || {
    items: [],
    isLoading: false,
    projectModes: [],
    hideLoadingMore: false,
  };

  const favoriteStore = favorite[FAVORITE_TRENDING] || {
    keys: [],
    items: [],
    isLoading: false,
  };

  const getUrl = useCallback(() => {
    return TRENDING_URL + path + `?${TRENDING_PERIOD[trendingSince].value}`;
  }, [trendingSince, path]);

  const loadData = (refresh) => {
    if (refresh) {
      dispatch(action.onLoadTrendingData(tabName, getUrl(), PAGE_SIZE));
    } else {
      dispatch(
        action.onLoadMoreTrendingData(
          tabName,
          ++store.pageIndex,
          PAGE_SIZE,
          store.items,
          (message) => {
            toastRef.current.show(message, 1000);
          }
        )
      );
    }
  };

  useEffect(() => {
    dispatch(action.onLoadTrendingData(tabName, getUrl(), PAGE_SIZE, true));
  }, [trendingSince, dispatch, getUrl, tabName]);

  useEffect(() => {
    dispatch(action.onLoadFavoriteItems(FAVORITE_TRENDING));
  }, [dispatch]);

  const ListFooterComponent = () => {
    return store.hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color={theme} />
        <Text style={[styles.indicator, { color: theme }]}>Loading More</Text>
      </View>
    );
  };

  const renderItem = (data) => {
    const isFavorite =
      favoriteStore.keys.indexOf(
        FAVORITE_TRENDING + '_' + data.item.full_name
      ) >= 0;
    return (
      <TrendingItem
        item={data.item}
        isFavorite={isFavorite}
        onSelect={() =>
          navigation.navigate('DetailPage', {
            repo: data.item,
            flag: FAVORITE_TRENDING,
            isFavorite,
          })
        }
      />
    );
  };

  return (
    <View>
      <FlatList
        data={store.projectModes || []}
        renderItem={(data) => renderItem(data)}
        keyExtractor={(item) => '' + item.html_url}
        refreshControl={
          <RefreshControl
            title="Loading"
            colors={[theme]}
            tintColor={theme}
            titleColor={theme}
            refreshing={store.isLoading}
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
      <Toast ref={toastRef} position="top" opacity={0.9} />
    </View>
  );
};

const TrendingPage = () => {
  // Ignore all log notifications:
  LogBox.ignoreAllLogs();
  const [modalShow, setModalShow] = useState(false);
  const [trendingSince, setTrendingSince] = useState('day');

  const Tab = createMaterialTopTabNavigator();
  const langs = useDeepSelector('languages')[LANGUAGES];
  const { theme } = useSelector((state) => state.theme);
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(action.onLoadLanguages(LANGUAGES));
  }, [dispacth]);

  const closeModal = useCallback(() => {
    setModalShow(false);
  }, []);

  const showModal = useCallback(() => {
    setModalShow(true);
  }, []);

  const onSelectTime = (timeKey) => {
    closeModal();
    if (trendingSince !== timeKey) {
      setTrendingSince(timeKey);
    }
  };

  const renderTitleView = () => {
    return (
      <View>
        <TouchableOpacity underlayColor="transparent" onPress={showModal}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{`Trending ${trendingSince}`}</Text>
            <MaerialIcons
              name="arrow-drop-down"
              size={22}
              style={styles.titleIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <StyledSafeView head headColor={theme}>
      <NavigationBar
        title="Trending"
        titleView={renderTitleView}
        style={{
          backgroundColor: theme,
        }}
      />
      {langs?.length > 0 && (
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
            lazy: true,
          }}
          style={[{ backgroundColor: theme }]}
          tabBarScrollEnabled={true}
        >
          {langs.map(({ name: tabName, path, checked }, index) => {
            return tabName && checked ? (
              <Tab.Screen
                key={tabName}
                name={tabName.replace(/\s/g, '')}
                options={{
                  title: tabName,
                }}
              >
                {(props) => (
                  <TrendingTab
                    {...props}
                    tabName={tabName}
                    path={path}
                    theme={theme}
                    trendingSince={trendingSince}
                  />
                )}
              </Tab.Screen>
            ) : null;
          })}
        </Tab.Navigator>
      )}
      <TrendingModal
        visible={modalShow}
        onRequestClose={closeModal}
        onSelect={onSelectTime}
      />
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400',
  },
  titleIcon: {
    color: '#fff',
  },
});

export default TrendingPage;
