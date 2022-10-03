import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { ComponentType, PropsWithChildren } from 'react';
import Desktop from '../../components/mui-navigation-desktop';
import Mobile from '../../components/mui-navigation-mobile';
import useMuiMobile from '../../hooks/use-mui-mobile';
import type Props from '../../types/mui-navigation-props';

interface State {
  readonly Drawer: ComponentType<PropsWithChildren<Props>>;
  readonly ariaLabel: string | undefined;
}

export default function useMuiNavigation(): State {
  const translate: TranslateFunction = useTranslate();

  const isMobile: boolean = useMuiMobile();

  return {
    Drawer: isMobile ? Mobile : Desktop,
    ariaLabel: translate('Main navigation'),
  };
}
