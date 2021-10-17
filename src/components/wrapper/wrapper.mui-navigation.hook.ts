import type { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { ComponentType, PropsWithChildren } from 'react';
import type Props from './types/mui-navigation-props';
import Desktop from './wrapper.mui-navigation-desktop.view';
import Mobile from './wrapper.mui-navigation-mobile.view';

interface State {
  readonly Drawer: ComponentType<PropsWithChildren<Props>>;
  readonly ariaLabel: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const mobileMediaQuery = (theme: Readonly<Theme>): string =>
  theme.breakpoints.down('lg');

export default function useMuiNavigation(): State {
  const isMobile: boolean = useMediaQuery(mobileMediaQuery);
  const translate: TranslateFunction = useTranslate();

  return {
    Drawer: isMobile ? Mobile : Desktop,
    ariaLabel: translate('Main navigation'),
  };
}
