import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { ComponentType } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type Notification from '../../types/notification';
import HeaderInfo from './spritesheet2gif.header-info.view';

interface State {
  readonly Help: ComponentType<unknown>;
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
  const [Help, setHelp] = useState(getDefaultTools);
  const [error, setError] = useState<Error | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  return {
    Help,
    handleError: setError,
    helpOpen,

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
