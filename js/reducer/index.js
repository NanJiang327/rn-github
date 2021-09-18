import { combineReducers } from 'redux';

import themeReducer from './theme';
import popularReducer from './popular';
import trendingReducer from './trending';
import favoriteReducer from './favorite';
import languageReducer from './languages';

const index = combineReducers({
  theme: themeReducer,
  popular: popularReducer,
  trending: trendingReducer,
  favorite: favoriteReducer,
  languages: languageReducer,
});

export default index;
