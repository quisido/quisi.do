import { AppLayoutProps } from '@awsui/components-react/app-layout';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import { useAppLayout } from 'use-awsui';

interface Props {
  controlledToolsOpen?: boolean;
  onToolsChange?(
    event: NonCancelableCustomEvent<AppLayoutProps.ChangeDetail>,
  ): void;
}

interface State {
  ariaLabels: AppLayoutProps.Labels;
  navigationOpen?: boolean;
  toolsOpen?: boolean;
  handleNavigationChange(
    event: NonCancelableCustomEvent<AppLayoutProps.ChangeDetail>,
  ): void;
  handleToolsChange(
    event: NonCancelableCustomEvent<AppLayoutProps.ChangeDetail>,
  ): void;
}

export default function useCustomAppLayout({
  controlledToolsOpen,
  onToolsChange,
}: Props): State {
  const translate: TranslateFunction = useTranslate();

  const {
    handleNavigationChange,
    handleToolsChange,
    navigationOpen,
    toolsOpen,
  } = useAppLayout({
    defaultToolsOpen: false,
  });

  return {
    handleNavigationChange,
    navigationOpen,

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
