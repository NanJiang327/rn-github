import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Vibration,
  Alert,
} from 'react-native';
import useDeepSelector from '../hooks/useDeepSelector';

import action from '../action';
import { GlobalStyles } from '../constants';

import NavigationBar from '../components/NavigationBar';
import NavButton from '../components/NavButton';
import CheckBox from '../components/CheckBox';
import StyledSafeView from '../components/StyledSafeView';

const CustomTagPage = ({ navigation, route }) => {
  const { title, flag } = route.params;
  const dispacth = useDispatch();
  const values = useDeepSelector('languages')[flag];
  const { theme } = useSelector((state) => state.theme);
  const [tempValues, setTempValus] = useState();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispacth(action.onLoadLanguages(flag));
  }, [dispacth, flag]);

  useEffect(() => {
    if (JSON.stringify(tempValues) !== JSON.stringify(values)) {
      setTempValus(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const Tags = () => {
    return (
      <View style={styles.tagsContainer}>
        {tempValues &&
          tempValues.map((item, index) => (
            <React.Fragment key={item.name}>
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  value={item.checked}
                  index={index}
                  onToggle={onCheck}
                  theme={theme}
                />
                <Text style={styles.checkBoxText}>{item.name}</Text>
              </View>
              <View style={GlobalStyles.underline} />
            </React.Fragment>
          ))}
      </View>
    );
  };

  const onBack = () => {
    if (
      tempValues !== null &&
      JSON.stringify(tempValues) !== JSON.stringify(values)
    ) {
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

  const onCheck = (value, idx) => {
    setTempValus((preValues) => {
      return preValues.map((item, i) => {
        if (i === idx) {
          return {
            ...item,
            checked: value,
          };
        } else {
          return item;
        }
      });
    });
    Vibration.vibrate(500);
  };

  return (
    <StyledSafeView head headColor={theme} customSafeView>
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
      <ScrollView style={styles.scrollView}>
        <Tags />
      </ScrollView>
    </StyledSafeView>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    paddingTop: 8,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  checkBoxText: {
    marginLeft: 8,
  },
  leftButton: {
    paddingLeft: 8,
  },
  rightButton: {
    paddingRight: 8,
  },
});

export default CustomTagPage;
