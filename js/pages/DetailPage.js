import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import NavButton from '../components/NavButton';
import NavigationBar from '../components/NavigationBar';
import StyledSafeView from '../components/StyledSafeView';

import action from '../action';

const DetailPage = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { repo, flag, isFavorite } = route.params;
  const [canGoBack, setCanGoBack] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);
  const [url, setUrl] = useState(repo.html_url);
  const webViewRef = useRef(null);
  const { full_name } = repo;

  const onNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setUrl(navState.url);
  };

  const onFavoritePress = () => {
    const favoriteKey = `${flag}_${full_name}`;
    if (favorite) {
      dispatch(action.removeFavoriteItem(flag, favoriteKey));
      setFavorite(false);
    } else {
      dispatch(action.addFavoriteItem(flag, favoriteKey, repo));
      setFavorite(true);
    }
  };

  const onBack = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <StyledSafeView headColor={theme} head customSafeView>
      <NavigationBar
        title={full_name}
        titleLayoutStyle={full_name.length > 20 ? styles.titleLayout : {}}
        statusBar={{
          backgroundColor: theme,
          barStyle: 'light-content',
        }}
        style={{
          backgroundColor: theme,
        }}
        leftButton={
          <NavButton
            style={styles.leftButton}
            color="#fff"
            name="ios-arrow-back"
            onPress={onBack}
            size={24}
          />
        }
        rightButton={
          <View style={styles.rightButtonContainer}>
            <NavButton
              style={styles.rightButton}
              color={favorite ? '#ff748c' : '#ffffff'}
              name={favorite ? 'heart' : 'heart-outline'}
              size={24}
              onPress={onFavoritePress}
            />
            <NavButton
              style={styles.rightButton}
              color="#fff"
              name="share-social-outline"
              size={24}
            />
          </View>
        }
      />
      {url ? (
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          startInLoadingState={true}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : null}
    </StyledSafeView>
  );
};

const styles = StyleSheet.create({
  rightButtonContainer: {
    paddingLeft: 30,
    flexDirection: 'row',
  },
  leftButton: {
    marginLeft: 10,
  },
  rightButton: {
    marginRight: 10,
  },
  titleLayout: {
    paddingRight: 35,
  },
});

export default DetailPage;
