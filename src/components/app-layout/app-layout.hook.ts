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

export default function useCSAppLayout({
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
        navigation: translate('Navigation') || undefined,
        navigationToggle: translate('Toggle navigation') || undefined,
        navigationClose: translate('Close navigation') || undefined,
        notifications: translate('Notifications') || undefined,
        tools: translate('Tools') || undefined,
        toolsToggle: translate('Toggle tools') || undefined,
        toolsClose: translate('Close tools') || undefined,
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
