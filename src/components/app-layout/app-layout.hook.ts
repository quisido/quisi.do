import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { MutableRefObject } from 'react';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useAppLayout } from 'use-awsui';

interface Props {
  readonly controlledToolsOpen?: boolean;
  readonly onToolsChange?: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
    >,
  ) => void;
}

interface State {
  readonly ariaLabels: AppLayoutProps.Labels;
  readonly navigationOpen?: boolean;
  readonly ref: MutableRefObject<HTMLDivElement | null>;
  readonly toolsOpen?: boolean;
  readonly handleNavigationChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
    >,
  ) => void;
  readonly handleToolsChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
    >,
  ) => void;
}

export default function useCustomAppLayout({
  controlledToolsOpen,
  onToolsChange,
}: Props): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const {
    handleNavigationChange,
    handleToolsChange,
    navigationOpen,
    toolsOpen,
  } = useAppLayout({
    defaultToolsOpen: false,
  });

  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // Effects
  useLayoutEffect((): void => {
    if (ref.current === null) {
      return;
    }
    ref.current.scrollIntoView();
  }, []);

  return {
    handleNavigationChange,
    navigationOpen,
    ref,

    ariaLabels: useMemo(
      (): AppLayoutProps.Labels => ({
        navigation: translate('Navigation'),
        navigationToggle: translate('Toggle navigation'),
        navigationClose: translate('Close navigation'),
        notifications: translate('Notifications'),
        tools: translate('Tools'),
        toolsToggle: translate('Toggle tools'),
        toolsClose: translate('Close tools'),
      }),
      [translate],
    ),

    handleToolsChange:
      typeof onToolsChange === 'function' ? onToolsChange : handleToolsChange,

    toolsOpen:
      typeof controlledToolsOpen === 'boolean'
        ? controlledToolsOpen
        : toolsOpen,
  };
}
