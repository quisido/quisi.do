import Settings from '../components/settings';
import NavigationText from '../constants/navigation-text';
import type NavigationCategory from '../types/navigation-category';
import type NavigationComponent from '../types/navigation-component';
import type NavigationExternalLink from '../types/navigation-external-link';
import type NavigationLink from '../types/navigation-link';

const NAVIGATION_ITEMS: readonly (
  | NavigationCategory
  | NavigationComponent
  | NavigationExternalLink
  | NavigationLink
)[] = [
  {
    path: '/',
    text: NavigationText.Home,
  },
  {
    defaultExpanded: true,
    text: NavigationText.Applications,
    children: [
      {
        path: '/spritesheet2gif',
        text: NavigationText.Spritesheet2Gif,
      },
      {
        defaultExpanded: false,
        text: NavigationText.MoreApplications,
        children: [
          {
            text: NavigationText.AceAlters,
            url: 'https://acealters.com/',
          },
          {
            text: NavigationText.Tetris3DS,
            url: 'https://charlesstover.github.io/3ds-tetris/',
          },
          {
            text: NavigationText.Dota2Huds,
            url: 'https://charlesstover.github.io/dota2huds/',
          },
          {
            text: NavigationText.MTGPlanechase,
            url: 'https://mtgenius.github.io/planechase/',
          },
          {
            text: NavigationText.Quisido,
            url: 'https://quisido.com/',
          },
          {
            text: NavigationText.RPGOverworldEngine,
            url: 'https://charlesstover.github.io/rpg-overworld-engine/',
          },
        ],
      },
    ],
  },
  {
    defaultExpanded: true,
    text: NavigationText.Portfolio,
    children: [
      {
        path: '/packages',
        text: NavigationText.Packages,
      },
      {
        path: '/publications',
        text: NavigationText.Publications,
      },
      {
        path: '/quotes',
        text: NavigationText.Quotes,
      },
    ],
  },
  {
    defaultExpanded: true,
    text: NavigationText.ConnectWithMe,
    children: [
      {
        url: 'https://github.com/CharlesStover',
        text: NavigationText.GitHub,
      },
      {
        url: 'https://www.linkedin.com/in/charles-stover/',
        text: NavigationText.LinkedIn,
      },
      {
        url: 'https://charles-stover.medium.com/',
        text: NavigationText.Medium,
      },
      /*
      {
        url: 'https://www.npmjs.com/~charlesstover',
        text: NavigationText.NPM,
      },
      {
        url: 'https://www.reddit.com/user/Charles_Stover',
        text: NavigationText.Reddit,
      },
      {
        url: 'https://stackoverflow.com/users/4856301/charles-stover',
        text: NavigationText.StackOverflow,
      },
      */
      {
        url: 'https://twitter.com/CharlesStover',
        text: NavigationText.Twitter,
      },
    ],
  },
  {
    Component: Settings,
    defaultExpanded: false,
    text: NavigationText.Settings,
  },
];

export default NAVIGATION_ITEMS;
