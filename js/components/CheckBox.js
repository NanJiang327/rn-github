import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';

import CheckBoxComponent from '@react-native-community/checkbox';

import { shadeColor } from '../action/utils';

const CheckBox = ({ disabled = false, value, index, onToggle, theme }) => {
  const [checked, setChecked] = useState(value);

  const onValueChange = useCallback(
    (newValue) => {
      setChecked(newValue);
      onToggle(newValue, index);
    },
    [onToggle, index]
  );

  return (
    <CheckBoxComponent
      disabled={disabled}
      value={checked}
      tintColor={theme}
      onCheckColor={shadeColor(theme, -80)}
      onTintColor={shadeColor(theme, -80)}
      tintColors={{ true: theme, false: shadeColor(theme, -80) }}
      styles={styles.checkbox}
      onAnimationType="one-stroke"
      onValueChange={onValueChange}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    height: 20,
    width: 20,
  },
});

export default CheckBox;
