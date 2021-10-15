import type { AppLayoutProps } from '@awsui/components-react/app-layout';
import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { ComponentType } from 'react';
import { useCallback, useMemo, useState } from 'react';
import HeaderInfo from './components/header-info';

interface State {
  readonly Help: ComponentType<unknown>;
  readonly handleError: (error: Readonly<Error>) => void;
  readonly handleErrorDismiss: () => void;
  readonly handleHelpDismiss: () => void;
  readonly handleHelpRequest: (Help: ComponentType<unknown>) => void;
  readonly helpOpen: boolean;
  readonly notifications: FlashbarProps.MessageDefinition[];
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
      setHelp(NewHelp);
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

    notifications: useMemo((): FlashbarProps.MessageDefinition[] => {
      const newNotifications: FlashbarProps.MessageDefinition[] = [];
      if (error !== null) {
        newNotifications.push({
          content: error.message,
          dismissLabel: 'Dismiss',
          dismissible: true,
          header: 'An error occurred.',
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
