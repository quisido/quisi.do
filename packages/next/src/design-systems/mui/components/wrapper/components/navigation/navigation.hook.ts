import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { ComponentType, PropsWithChildren } from 'react';
import useMuiMobile from '../../hooks/use-mobile';
import type Props from '../../types/navigation-props';
import Desktop from '../navigation-desktop';
import Mobile from '../navigation-mobile';

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
