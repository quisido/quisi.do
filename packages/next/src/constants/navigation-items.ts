import Settings from '../components/settings.js';
import NavigationText from '../constants/navigation-text.js';
import type NavigationCategory from '../types/navigation-category.js';
import type NavigationComponent from '../types/navigation-component.js';
import type NavigationExternalLink from '../types/navigation-external-link.js';
import type NavigationLink from '../types/navigation-link.js';

const NAVIGATION_ITEMS: readonly (
  | NavigationCategory
  | NavigationComponent
  | NavigationExternalLink
  | NavigationLink
)[] = [
  {
    text: NavigationText.Home,
    path: '/',
  },
  {
    text: NavigationText.Dashboard,
    path: '/dashboard/',
  },
  {
    text: NavigationText.Applications,
    defaultExpanded: false,
    children: [
      {
        text: NavigationText.Tetris3DS,
        url: 'https://quisido.github.io/3ds-tetris/',
      },
      {
        text: NavigationText.AceAlters,
        url: 'https://acealters.com/',
      },
      /*
      {
        text: NavigationText.CloudflareWorkersAI,
        path: '/cloudflare-workers-ai/',
      },
      */
      {
        text: NavigationText.Dota2Huds,
        url: 'https://quisido.github.io/dota2huds/',
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
        url: 'https://quisido.github.io/rpg-overworld-engine/',
      },
    ],
  },
  {
    text: NavigationText.Portfolio,
    defaultExpanded: true,
    children: [
      {
        text: NavigationText.Packages,
        path: '/packages/',
      },
      {
        text: NavigationText.Publications,
        path: '/publications/',
      },
      {
        text: NavigationText.Quotes,
        path: '/quotes/',
      },
    ],
  },
  {
    text: NavigationText.ConnectWithMe,
    defaultExpanded: true,
    children: [
      /*
      {
        text: NavigationText.Bluesky,
        url: 'https://bsky.app/profile/stover.bsky.social',
      },
      */
      {
        text: NavigationText.GitHub,
        url: 'https://github.com/quisido/',
      },
      {
        text: NavigationText.LinkedIn,
        url: 'https://www.linkedin.com/in/quisido/',
      },
      /*
      {
        text: NavigationText.Medium,
        url: 'https://charles-stover.medium.com/',
      },
      {
        text: NavigationText.NPM,
        url: 'https://www.npmjs.com/~charlesstover',
      },
      {
        text: NavigationText.Reddit,
        url: 'https://www.reddit.com/user/Charles_Stover',
      },
      {
        text: NavigationText.StackOverflow,
        url: 'https://stackoverflow.com/users/4856301/charles-stover',
      },
      {
        text: NavigationText.Threads,
        url: 'https://threads.net/@charlesstover21',
      },
      */
    ],
  },
  {
    text: NavigationText.Settings,
    Component: Settings,
    defaultExpanded: false,
  },
];

export default NAVIGATION_ITEMS;
