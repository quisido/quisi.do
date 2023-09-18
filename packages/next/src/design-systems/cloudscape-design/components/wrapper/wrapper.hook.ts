import type { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { MutableRefObject } from 'react';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useAppLayout } from 'use-awsui';

interface Props {
  readonly controlledToolsOpen: boolean | undefined;
  readonly onToolsChange:
    | ((
        event: Readonly<
          NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
        >,
      ) => void)
    | undefined;
}

interface State {
  readonly ariaLabels: AppLayoutProps.Labels;
  readonly navigationOpen: boolean | undefined;
  readonly ref: MutableRefObject<HTMLDivElement | null>;
  readonly toolsOpen: boolean | undefined;
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

export default function useCloudscapeDesignWrapper(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const {
    handleNavigationChange,
    handleToolsChange,
    navigationOpen,
    toolsOpen,
  } = useAppLayout({
    defaultToolsOpen: false,
  });

  // Effects
  useLayoutEffect((): void => {
    if (ref.current === null) {
      return;
    }
    ref.current.scrollIntoView();
  }, []);

  return {
    handleNavigationChange,
    handleToolsChange,
    navigationOpen,
    toolsOpen,
    ref,

    ariaLabels: useMemo((): AppLayoutProps.Labels => {
      // Workaround until Cloudscape supports TypeScript 4.4 exact optional
      //   properties.
      // https://github.com/aws/awsui-documentation/issues/14
      const newAriaLabels: AppLayoutProps.Labels = {};
      const navigation: string | undefined = translate('Navigation');
      if (typeof navigation === 'string') {
        newAriaLabels.navigation = navigation;
      }

      const navigationToggle: string | undefined =
        translate('Toggle navigation');
      if (typeof navigationToggle === 'string') {
        newAriaLabels.navigationToggle = navigationToggle;
      }

      const navigationClose: string | undefined = translate('Close navigation');
      if (typeof navigationClose === 'string') {
        newAriaLabels.navigationClose = navigationClose;
      }

      const notifications: string | undefined = translate('Notifications');
      if (typeof notifications === 'string') {
        newAriaLabels.notifications = notifications;
      }

      const tools: string | undefined = translate('Tools');
      if (typeof tools === 'string') {
        newAriaLabels.tools = tools;
      }

      const toolsToggle: string | undefined = translate('Toggle tools');
      if (typeof toolsToggle === 'string') {
        newAriaLabels.toolsToggle = toolsToggle;
      }

      const toolsClose: string | undefined = translate('Close tools');
      if (typeof toolsClose === 'string') {
        newAriaLabels.toolsClose = toolsClose;
      }

      return newAriaLabels;
    }, [translate]),
  };
}
