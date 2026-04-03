import { useMemo, useState } from 'react';
import useId from './use-id.js';
import { toString } from 'fmrs';

interface Props {
  readonly onAppend?: (() => Promise<void>) | undefined;
  readonly onPrepend?: (() => Promise<void>) | undefined;
}

export interface FeedState {
  readonly appending: boolean;
  readonly busy: boolean;
  readonly errorMessage: string | undefined;
  readonly errorMessageId: string | undefined;
  readonly handleAppend: VoidFunction | undefined;
  readonly handlePrepend: VoidFunction | undefined;
  readonly prepending: boolean;
}

export default function useFeed({ onAppend, onPrepend }: Props): FeedState {
  const errorMessageId: string = useId();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [appending, setAppending] = useState(false);
  const [prepending, setPrepending] = useState(false);

  return {
    appending,
    busy: appending || prepending,
    errorMessage,

    errorMessageId: ((): string | undefined => {
      if (errorMessage === undefined) {
        return;
      }

      return errorMessageId;
    })(),

    handleAppend: useMemo((): VoidFunction | undefined => {
      if (onAppend === undefined) {
        return;
      }

      return (): void => {
        setAppending(true);

        void onAppend()
          .catch((err: unknown): void => {
            setErrorMessage(toString(err));
          })
          .finally((): void => {
            setAppending(false);
          });
      };
    }, [onAppend]),

    handlePrepend: useMemo((): VoidFunction | undefined => {
      if (onPrepend === undefined) {
        return;
      }

      return (): void => {
        setPrepending(true);

        void onPrepend()
          .catch((err: unknown): void => {
            setErrorMessage(toString(err));
          })
          .finally((): void => {
            setPrepending(false);
          });
      };
    }, [onPrepend]),

    prepending,
  };
}
