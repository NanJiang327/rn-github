import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const ThemeFlags = {
  Default: '#2196F3',
  Red: '#F44336',
  Pink: '#E91E63',
  Purple: '#9C27B0',
  DeepPurple: '#673AB7',
  Indigo: '#3F51B5',
  RoyalBlue: '#4169e1',
  LightBlue: '#03A9F4',
  Cyan: '#00BCD4',
  Teal: '#009688',
  Green: '#4CAF50',
  LightGreen: '#8BC34A',
  Lime: '#CDDC39',
  Yellow: '#FFEB3B',
  Amber: '#FFC107',
  Orange: '#FF9800',
  DeepOrange: '#FF5722',
  Brown: '#795548',
  Grey: '#9E9E9E',
  BlueGrey: '#607D8B',
  Black: '#000000',
};
const BG_COLOR = '#f3f4f5';

export default {
  underline: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: '#777',
  },
  root_container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bg_color: BG_COLOR,
  windowHeight: height,
  windowWidth: width,
};
