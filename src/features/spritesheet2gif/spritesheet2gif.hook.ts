import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { ComponentType } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type Breadcrumb from '../../types/breadcrumb';
import type Notification from '../../types/notification';
import HeaderInfo from './components/header-info';

interface State {
  readonly Help: ComponentType<unknown>;
  readonly breadcrumbs: readonly Breadcrumb[];
  readonly handleError: (error: Readonly<Error>) => void;
  readonly handleErrorDismiss: () => void;
  readonly handleHelpDismiss: () => void;
  readonly handleHelpRequest: (Help: ComponentType<unknown>) => void;
  readonly helpOpen: boolean;
  readonly notifications: readonly Notification[];
  readonly handleHelpChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
    >,
  ) => void;
}

const getDefaultTools = (): ComponentType<unknown> => HeaderInfo;

export default function useSpritesheet2Gif(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const [Help, setHelp] = useState(getDefaultTools);
  const [error, setError] = useState<Error | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  return {
    Help,
    handleError: setError,
    helpOpen,

    breadcrumbs: useMemo(
      (): readonly Breadcrumb[] => [
        {
          children: translate('Sprite sheet to GIF') ?? '...',
          path: '/spritesheet2gif',
        },
      ],
      [translate],
    ),

    handleErrorDismiss: useCallback((): void => {
      setError(null);
    }, []),

    handleHelpDismiss: useCallback((): void => {
      setHelpOpen(false);
    }, []),

    handleHelpRequest: useCallback((NewHelp: ComponentType<unknown>): void => {
      setHelp((): ComponentType<unknown> => NewHelp);
      setHelpOpen(true);
    }, []),

    handleHelpChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<AppLayoutProps.ChangeDetail>>
        >,
      ): void => {
        setHelpOpen(e.detail.open);
      },
      [],
    ),

    notifications: useMemo((): readonly Notification[] => {
      const newNotifications: Notification[] = [];
      if (error !== null) {
        newNotifications.push({
          message: error.message,
          type: 'error',
          onDismiss(): void {
            setError(null);
          },
        });
      }
      return newNotifications;
    }, [error]),
  };
}
