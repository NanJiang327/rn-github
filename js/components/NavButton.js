import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavButton = ({ name, size, style, color, onPress, disabled = false }) => {
  return (
    <View>
      <TouchableOpacity style={style} disabled={disabled} onPress={onPress}>
        <View>
          <Ionicons name={name} size={size} style={{ color }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NavButton;
