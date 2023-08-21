import type { MutableRefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import mapUnknownToString from 'unknown2string';
import type AsyncState from '../types/async-state';

interface State<T> {
  readonly asyncEffectRef: MutableRefObject<Promise<unknown> | undefined>;
  readonly data: T | undefined;
  readonly error: string | undefined;
  readonly initiated: boolean;
  readonly loading: boolean;
}

const DEFAULT_ASYNC_STATE = {
  data: undefined,
  error: undefined,
  initiated: false,
  loading: false,
} satisfies AsyncState<unknown>;

export default function useAsyncState<T>(
  get: () => Promise<T>,
  onError?: ((error: string) => void) | undefined,
): State<T> {
  // States
  const asyncEffectRef: MutableRefObject<Promise<unknown> | undefined> =
    useRef();
  const getRef: MutableRefObject<() => Promise<T>> = useRef(get);
  const handleErrorRef: MutableRefObject<
    ((error: string) => void) | undefined
  > = useRef(onError);
  const [asyncState, setAsyncState] =
    useState<AsyncState<T>>(DEFAULT_ASYNC_STATE);

  getRef.current = get;
  handleErrorRef.current = onError;
  useEffect((): void => {
    const getState = async (): Promise<void> => {
      setAsyncState({
        data: undefined,
        error: undefined,
        initiated: true,
        loading: true,
      });

      try {
        const data: T = await get();

        // If this data does not belong to this getter, bail.
        if (get !== getRef.current) {
          return;
        }

        setAsyncState({
          data,
          error: undefined,
          initiated: true,
          loading: false,
        });
      } catch (err: unknown) {
        // If this error does not belong to this getter, bail.
        if (get !== getRef.current) {
          return;
        }

        const errorStr: string = mapUnknownToString(err);
        setAsyncState({
          data: undefined,
          error: errorStr,
          initiated: true,
          loading: false,
        });

        if (typeof handleErrorRef.current === 'function') {
          handleErrorRef.current(errorStr);
        }
      }
    };

    asyncEffectRef.current = getState();
  }, [get]);

  return {
    ...asyncState,
    asyncEffectRef,
  };
}
