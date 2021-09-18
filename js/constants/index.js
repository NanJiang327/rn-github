export const TRENDING_PERIOD = {
  day: { name: 'Today', value: 'since=daily' },
  week: { name: 'Week', value: 'since=weekly' },
  month: { name: 'Month', value: 'since=monthly' },
};
export const TRENDING_URL = 'https://github.com/trending/';
export const REPO_URL = 'https://api.github.com/search/repositories?q=';
export const PAGE_SIZE = 10;
export const FAVORITE_KEY_PREFIX = 'favorite_';
export const FAVORITE_POPULAR = FAVORITE_KEY_PREFIX + 'popular';
export const FAVORITE_TRENDING = FAVORITE_KEY_PREFIX + 'trending';
export const TAGS = 'tags';
export const LANGUAGES = 'languages';
export const PROFILE_MENUS = [
  {
    type: 'App',
    menu: [
      {
        name: 'Author',
        icon: 'github',
        size: 40,
        subMenu: [
          {
            name: 'Github',
            url: 'https://github.com/NanJiang327',
            icon: 'github',
          },
          {
            name: 'Email me',
            icon: 'email-outline',
          },
          {
            name: 'Wechat',
            icon: 'wechat',
          },
          {
            name: 'Calendar Native Event Test',
            icon: 'calendar',
          },
        ],
      },
      {
        name: 'Custom Theme',
        icon: 'format-color-fill',
      },
      {
        name: 'Clear Storage',
        icon: 'delete-outline',
      },
    ],
  },
  {
    type: 'Popular',
    menu: [
      {
        name: 'Custom Tags',
        icon: 'tag-heart-outline',
      },
      {
        name: 'Tag Orders',
        icon: 'sort',
      },
    ],
  },
  {
    type: 'Trending',
    menu: [
      {
        name: 'Custom Languages',
        icon: 'spellcheck',
      },
      {
        name: 'Language Orders',
        icon: 'sort',
      },
    ],
  },
  {
    type: 'Information',
    menu: [
      {
        name: 'Documentaion',
        icon: 'lightbulb-on-outline',
      },
      {
        name: 'Feedback',
        icon: 'comment-alert-outline',
      },
      {
        name: 'Share',
        icon: 'share-outline',
      },
      {
        name: 'Code Push',
        icon: 'file-code-outline',
      },
    ],
  },
];

export GlobalStyles, { ThemeFlags } from './styles';
