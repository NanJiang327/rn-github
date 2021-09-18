import { onLoadPopularData, onLoadMorePopularData } from './popular';
import { onLoadTrendingData, onLoadMoreTrendingData } from './trending';
import {
  onLoadKeys,
  onLoadFavoriteItems,
  addFavoriteItem,
  removeFavoriteItem,
} from './favorite';
import { onLoadLanguages, saveLanguages } from './languages';
import { onLoadTheme, onThemeChange } from './theme';

export default {
  onLoadPopularData,
  onLoadMorePopularData,
  onLoadTrendingData,
  onLoadMoreTrendingData,
  onLoadFavoriteItems,
  onLoadKeys,
  addFavoriteItem,
  removeFavoriteItem,
  onLoadLanguages,
  saveLanguages,
  onLoadTheme,
  onThemeChange,
};
