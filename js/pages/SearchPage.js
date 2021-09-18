import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-easy-toast';
import NavButton from '../components/NavButton';
import PopularItem from '../components/PopularItem';
import StyledSafeView from '../components/StyledSafeView';

import { GlobalStyles, FAVORITE_POPULAR, TAGS } from '../constants';

import useDeepSelector from '../hooks/useDeepSelector';

import action from '../action';

const INIT_SIZE = 10;

const SearchPage = ({ navigation }) => {
  const { theme } = useSelector((state) => state.theme);
  const favorite = useDeepSelector('favorite');
  const favoriteStore = favorite[FAVORITE_POPULAR];
  const tags = useDeepSelector('languages')[TAGS];
  const dispatch = useDispatch();
  const [index, setIndex] = useState(1);
  const [input, setInput] = useState(null);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isRendered = useRef(false);
  const toastRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(action.onLoadFavoriteItems(FAVORITE_POPULAR));
    dispatch(action.onLoadLanguages(TAGS));
    dispatch(action.onLoadTheme());
  }, [dispatch]);

  useEffect(() => {
    isRendered.current = true;

    return () => {
      isRendered.current = false;
    };
  }, [isRendered]);

  const onLoadData = (search = true) => {
    const url = `https://api.github.com/search/repositories?q=${input}&sort=stars`;
    if (search) {
      setIsSearching(true);
      inputRef.current.blur();
      setResults([]);
    } else {
      setIsRefreshing(true);
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const items = data?.items;
        if (items?.length && isRendered.current) {
          setResults(items);
          setIsSearching(false);
          setIsRefreshing(false);
        }
      });
  };

  const fakeLoadMore = () => {
    if (results?.length > index * INIT_SIZE) {
      setIsLoadingMore(true);

      setTimeout(() => {
        if (isRendered.current) {
          const tempIndex = index + 1;
          setIndex(tempIndex);
          setIsLoadingMore(false);
        }
      }, 800);
    } else {
      toastRef.current.show('Loaded all', 500);
    }
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
    <StyledSafeView head headColor={theme}>
      <View style={[styles.navBar, { backgroundColor: theme }]}>
        <NavButton
          onPress={() => {
            inputRef.current.blur();
            navigation.goBack();
          }}
          size={24}
          name="ios-chevron-back"
          color="#ffffff"
          style={styles.leftButton}
        />
        <TextInput
          value={input}
          placeholder={'Search popular repos'}
          onChangeText={setInput}
          placeholderTextColor="#fff"
          style={styles.textInput}
          ref={inputRef}
        />
        <NavButton
          size={24}
          style={styles.rightButton}
          disabled={isSearching}
          onPress={onLoadData}
          name="ios-search"
          color="#ffffff"
        />
      </View>
      <View style={styles.listContainer}>
        {isSearching ? (
          <ActivityIndicator
            style={styles.centering}
            size="large"
            animating={isSearching}
          />
        ) : null}
        {results?.length > 0 ? (
          <FlatList
            data={results.slice(0, index * INIT_SIZE)}
            renderItem={(data) => renderItem(data)}
            keyExtractor={(item) => '' + item.id}
            contentInset={{
              bottom: 45,
            }}
            refreshControl={
              <RefreshControl
                title={'Loading'}
                titleColor={theme}
                colors={[theme]}
                refreshing={isRefreshing}
                onRefresh={() => {
                  setIndex(1);
                  onLoadData(false);
                }}
                tintColor={theme}
              />
            }
            ListFooterComponent={
              isLoadingMore ? (
                <View style={styles.indicatorContainer}>
                  <ActivityIndicator
                    style={[styles.indicator, { color: theme }]}
                  />
                  <Text style={[{ color: theme }]}>Loading More</Text>
                </View>
              ) : null
            }
            onEndReached={fakeLoadMore}
            onEndReachedThreshold={0.2}
          />
        ) : null}
      </View>
      {input?.length > 0 && results?.length > 0 ? (
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: theme }]}
          onPress={() => {
            if (
              tags.find(
                (tag) =>
                  input.replace(/\s/g, '').toUpperCase() ===
                  tag.name.replace(/\s/g, '').toUpperCase()
              )
            ) {
              toastRef.current.show('Tag exists', 1000);
            } else {
              dispatch(
                action.addFavoriteItem(
                  FAVORITE_POPULAR,
                  FAVORITE_POPULAR + '_' + input,
                  results
                )
              );
              dispatch(
                action.saveLanguages(TAGS, [
                  ...tags,
                  {
                    name: input,
                    checked: true,
                    path: input,
                  },
                ])
              );
            }
          }}
        >
          <Text style={styles.title}>Save the tag</Text>
        </TouchableOpacity>
      ) : null}
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </StyledSafeView>
  );
};

const styles = StyleSheet.create({
  listContainer: { flex: 1 },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    margin: 10,
  },
  statusBar: {
    height: 20,
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    position: 'absolute',
    left: 10,
    top: GlobalStyles.windowHeight - 130,
    right: 10,
    borderColor: '#808080',
    borderWidth: 0.5,
    borderRadius: 3,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {
    flex: 1,
    borderRadius: 10,
    height: 36,
    borderWidth: 2,
    borderColor: 'white',
    alignSelf: 'center',
    paddingLeft: 5,
    marginRight: 10,
    marginLeft: 5,
    opacity: 0.7,
    color: 'white',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  leftButton: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  rightButton: {
    paddingLeft: 5,
    paddingRight: 10,
  },
});

export default SearchPage;
