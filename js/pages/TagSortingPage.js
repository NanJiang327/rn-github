import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Vibration,
  StyleSheet,
  LogBox,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import isEqual from 'lodash.isequal';

import useDeepSelector from '../hooks/useDeepSelector';
import action from '../action';
import { shadeColor } from '../action/utils';

import { GlobalStyles } from '../constants';

import NavigationBar from '../components/NavigationBar';
import NavButton from '../components/NavButton';
import StyledSafeView from '../components/StyledSafeView';

const TagSortingPage = ({ navigation, route }) => {
  LogBox.ignoreLogs([
    'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
  ]);
  const { title, flag } = route.params;
  const dispacth = useDispatch();
  const values = useDeepSelector('languages')[flag];
  const { theme } = useSelector((state) => state.theme);
  const [tempValues, setTempValus] = useState();

  useEffect(() => {
    dispacth(action.onLoadLanguages(flag));
  }, [dispacth, flag]);

  useEffect(() => {
    if (JSON.stringify(tempValues) !== JSON.stringify(values)) {
      setTempValus(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const onBack = () => {
    if (JSON.stringify(tempValues) !== JSON.stringify(values)) {
      Alert.alert(
        'Warning',
        'You will lost your unsaved changes if you leave the page now',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const onSave = () => {
    if (JSON.stringify(tempValues) === JSON.stringify(values)) {
      Alert.alert('Warning', "You haven't make any changse yet", [
        { text: 'OK' },
      ]);
    } else {
      Alert.alert('Success', '', [
        {
          text: 'OK',
          onPress: () => {
            dispacth(action.saveLanguages(flag, tempValues));
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const renderItem = useCallback(
    ({ item, drag, isActive }) => {
      return item && item.checked ? (
        <TouchableOpacity
          style={styles.draggableItemContainer}
          onLongPress={drag}
        >
          <MaterialCommunityIcons
            style={styles.draggbleIcon}
            name="sort"
            size={25}
            color={isActive ? shadeColor(theme, -80) : theme}
          />
          <Text style={styles.draggableText}>{item.name}</Text>
        </TouchableOpacity>
      ) : null;
    },
    [theme]
  );

  return (
    <StyledSafeView head headColor={theme}>
      <NavigationBar
        title={title}
        titleLayoutStyle={title.length > 20 ? styles.titleLayout : {}}
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
          <NavButton
            style={styles.rightButton}
            color="#fff"
            name="ios-save-outline"
            onPress={onSave}
            size={24}
          />
        }
      />
      {tempValues && (
        <View style={GlobalStyles.root_container}>
          <DraggableFlatList
            data={tempValues}
            renderItem={renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.name}`}
            onDragEnd={({ data }) => {
              if (!isEqual(data, tempValues)) {
                setTempValus(data);
                Vibration.vibrate(200);
              }
            }}
          />
        </View>
      )}
    </StyledSafeView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 50,
  },
  draggableItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor: '#808080',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    padding: 12,
  },
  draggableText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  leftButton: {
    paddingLeft: 8,
  },
  rightButton: {
    paddingRight: 8,
  },
});

export default TagSortingPage;
