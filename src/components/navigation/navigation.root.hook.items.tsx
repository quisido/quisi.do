import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import Settings from '../../components/settings';

export default function useItems(): SideNavigationProps.Item[] {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): SideNavigationProps.Item[] => [
      {
        href: '/',
        text: translate('Home') ?? '...',
        type: 'link',
      },
      {
        defaultExpanded: true,
        text: translate('Applications') ?? '...',
        type: 'section',
        items: [
          {
            href: '/spritesheet2gif',
            text: translate('Sprite sheet to GIF') ?? '...',
            type: 'link',
          },
          {
            defaultExpanded: false,
            text: translate('More applications') ?? '...',
            type: 'section',
            items: [
              {
                external: true,
                href: 'https://acealters.com/',
                text: 'AceAlters.com',
                type: 'link',
              },
              {
                external: true,
                href: 'https://charlesstover.github.io/3ds-tetris/',
                text: '3DS Tetris',
                type: 'link',
              },
              {
                external: true,
                href: 'https://charlesstover.github.io/dota2huds/',
                text: 'Dota 2 HUD gallery',
                type: 'link',
              },
              {
                external: true,
                href: 'https://mtgenius.github.io/planechase/',
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
                text: translate('RPG overworld engine') ?? '...',
                type: 'link',
              },
            ],
          },
        ],
      },
      {
        defaultExpanded: true,
        text: translate('Portfolio') ?? '...',
        type: 'section',
        items: [
          {
            href: '/packages',
            text: translate('Packages') ?? '...',
            type: 'link',
          },
          {
            href: '/publications',
            text: translate('Publications') ?? '...',
            type: 'link',
          },
          {
            href: '/quotes',
            text: translate('Quotes') ?? '...',
            type: 'link',
          },
        ],
      },
      {
        defaultExpanded: true,
        text: translate('Connect with me') ?? '...',
        type: 'section',
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
          {
            external: true,
            href: 'https://www.reddit.com/user/Charles_Stover',
            text: 'Reddit',
            type: 'link',
          },
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
      },
      {
        defaultExpanded: false,
        text: translate('Settings') ?? '...',
        type: 'section',
        items: [
          {
            type: 'link',
            text: '',
            href: '#settings',
            info: <Settings />,
          },
        ],
      },
    ],
    [translate],
  );
}
