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
    path: '/dashboard/',
    text: NavigationText.Dashboard,
  },
  {
    defaultExpanded: false,
    text: NavigationText.Applications,
    children: [
      {
        text: NavigationText.Tetris3DS,
        url: 'https://charlesstover.github.io/3ds-tetris/',
      },
      {
        text: NavigationText.AceAlters,
        url: 'https://acealters.com/',
      },
      {
        text: NavigationText.CloudflareWorkersAI,
        url: '/cloudflare-workers-ai/',
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
      {
        text: NavigationText.SpriteSheet2Gif,
        path: '/spritesheet2gif/',
      },
    ],
  },
  {
    defaultExpanded: true,
    text: NavigationText.Portfolio,
    children: [
      {
        path: '/packages/',
        text: NavigationText.Packages,
      },
      {
        path: '/publications/',
        text: NavigationText.Publications,
      },
      {
        path: '/quotes/',
        text: NavigationText.Quotes,
      },
    ],
  },
  {
    defaultExpanded: true,
    text: NavigationText.ConnectWithMe,
    children: [
      {
        url: 'https://bsky.app/profile/stover.bsky.social',
        text: NavigationText.Bluesky,
      },
      {
        url: 'https://github.com/CharlesStover/',
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
        url: 'https://threads.net/@charlesstover21',
        text: NavigationText.Threads,
      },
      /*
      {
        url: 'https://twitter.com/CharlesStover',
        text: NavigationText.Twitter,
      },
      */
    ],
  },
  {
    Component: Settings,
    defaultExpanded: false,
    text: NavigationText.Settings,
  },
];

export default NAVIGATION_ITEMS;
