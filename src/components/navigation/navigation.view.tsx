import Box from '@awsui/components-react/box';
import SideNavigation, {
  SideNavigationProps,
} from '@awsui/components-react/side-navigation';
import { ReactElement } from 'react';
import useReactRouterSideNavigation from '../../hooks/use-react-router-side-navigation';
import styles from './navigation.module.scss';

const ITEMS: SideNavigationProps.Item[] = [
  {
    href: '/',
    text: 'Home',
    type: 'link',
  },
  {
    defaultExpanded: true,
    items: [
      {
        href: '/spritesheet2gif',
        text: 'Sprite sheet to GIF',
        type: 'link',
      },
      {
        defaultExpanded: false,
        items: [
          {
            external: true,
            href: 'https://acealters.com/',
            text: 'AceAlters.com',
            type: 'link',
          },
          {
            external: true,
            href: 'https://charlesstover.github.io/3ds-tetris',
            text: '3DS Tetris',
            type: 'link',
          },
          {
            external: true,
            href: 'https://dota2huds.com/',
            text: 'Dota2HUDs.com',
            type: 'link',
          },
          {
            external: true,
            href: 'https://mtgenius.github.io/planechase',
            text: 'MTG Planechase',
            type: 'link',
          },
          {
            external: true,
            href: 'https://quisido.com/',
            text: 'Quisido.com',
            type: 'link',
          },
          {
            external: true,
            href: 'https://charlesstover.github.io/rpg-overworld-engine/',
            text: 'RPG overworld engine',
            type: 'link',
          },
        ],
        text: 'More applications',
        type: 'section',
      },
    ],
    text: 'Applications',
    type: 'section',
  },
  {
    defaultExpanded: true,
    items: [
      {
        href: '/packages',
        text: 'Packages',
        type: 'link',
      },
      {
        href: '/publications',
        text: 'Publications',
        type: 'link',
      },
      {
        href: '/quotes',
        text: 'Quotes',
        type: 'link',
      },
    ],
    text: 'Portfolio',
    type: 'section',
  },
  {
    defaultExpanded: true,
    items: [
      {
        external: true,
        href: 'https://github.com/CharlesStover',
        text: 'GitHub',
        type: 'link',
      },
      {
        external: true,
        href: 'https://www.linkedin.com/in/charles-stover/',
        text: 'LinkedIn',
        type: 'link',
      },
      {
        external: true,
        href: 'https://charles-stover.medium.com/',
        text: 'Medium',
        type: 'link',
      },
      /*
      {
        external: true,
        href: 'https://www.npmjs.com/~charlesstover',
        text: 'NPM',
        type: 'link',
      },
      */
      {
        external: true,
        href: 'https://www.reddit.com/user/Charles_Stover',
        text: 'Reddit',
        type: 'link',
      },
      /*
      {
        external: true,
        href: 'https://stackoverflow.com/users/4856301/charles-stover',
        text: 'StackOverflow',
        type: 'link',
      },
      */
      {
        external: true,
        href: 'https://twitter.com/CharlesStover',
        text: 'Twitter',
        type: 'link',
      },
    ],
    text: 'Connect with me',
    type: 'section',
  },
];

export default function Navigation(): ReactElement {
  const { activeHref, handleFollow } = useReactRouterSideNavigation();

  return (
    <>
      <Box margin="m" variant="h2">
        Navigation
      </Box>
      <SideNavigation
        activeHref={activeHref}
        className={styles.sideNavigation}
        items={ITEMS}
        onFollow={handleFollow}
      />
    </>
  );
}
