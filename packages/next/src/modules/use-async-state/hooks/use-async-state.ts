'use client';

import {
  type MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
import mapUnknownToString from 'unknown2string';
import type AsyncState from '../types/async-state';

export type State<T> = AsyncState<T> & BaseState<T>;

interface BaseState<T> {
  readonly asyncEffectRef: MutableRefObject<Promise<unknown> | undefined>;
  readonly request: (get: () => Promise<T>) => Promise<void>;
  readonly retry: () => Promise<void>;
}

const DEFAULT_ASYNC_STATE = {
  data: undefined,
  error: undefined,
  initiated: false,
  loading: false,
} satisfies AsyncState<unknown>;

export default function useAsyncState<T = unknown>(): State<T> {
  // States
  const lastGetRef: MutableRefObject<(() => Promise<T>) | undefined> = useRef();

  const asyncEffectRef: MutableRefObject<Promise<unknown> | undefined> =
    useRef();

  const [asyncState, setAsyncState] =
    useState<AsyncState<T>>(DEFAULT_ASYNC_STATE);

  // Callbacks
  const getState = useCallback(async (get: () => Promise<T>): Promise<void> => {
    lastGetRef.current = get;

    setAsyncState({
      data: undefined,
      error: undefined,
      initiated: true,
      loading: true,
    });

    try {
      const data: T = await get();

      // If this data does not belong to this getter, bail.
      if (get !== lastGetRef.current) {
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
      if (get !== lastGetRef.current) {
        return;
      }

      const errorStr: string = mapUnknownToString(err);
      setAsyncState({
        data: undefined,
        error: errorStr,
        initiated: true,
        loading: false,
      });
    }
  }, []);

  return {
    ...asyncState,
    asyncEffectRef,

    retry: useCallback(async (): Promise<void> => {
      if (typeof lastGetRef.current === 'undefined') {
        return;
      }

      const promise: Promise<unknown> = getState(lastGetRef.current);
      asyncEffectRef.current = promise;
      await promise;
    }, [getState]),

    request: useCallback(async (get: () => Promise<T>): Promise<void> => {
      const promise: Promise<unknown> = getState(get);
      asyncEffectRef.current = promise;
      await promise;
    }, [getState]),
  };
}
