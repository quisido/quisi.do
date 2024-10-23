'use client';

import { mapUnknownToString } from 'fmrs';
import {
  useCallback,
  useRef,
  useState,
  type MutableRefObject,
  type RefObject,
} from 'react';
import type AsyncState from '../types/async-state.js';

interface BaseState<T> {
  readonly asyncEffectRef: RefObject<Promise<void> | undefined>;
  readonly request: (get: () => Promise<T>) => Promise<void>;
  readonly reset: VoidFunction;
  readonly retry: () => Promise<void>;
  readonly set: (data: T) => void;
}

export type State<T> = AsyncState<T> & BaseState<T>;

const DEFAULT_ASYNC_STATE = {
  data: undefined,
  error: undefined,
  initiated: false,
  loading: false,
} satisfies AsyncState<unknown>;

export default function useAsyncState<T = unknown>(): State<T> {
  // States
  const asyncEffectRef: MutableRefObject<Promise<void> | undefined> =
    useRef(undefined);

  const lastGetRef: MutableRefObject<(() => Promise<T>) | undefined> =
    useRef(undefined);

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

    request: useCallback(
      async (get: () => Promise<T>): Promise<void> => {
        const promise: Promise<void> = getState(get);
        asyncEffectRef.current = promise;
        await promise;
      },
      [getState],
    ),

    reset: useCallback((): void => {
      asyncEffectRef.current = undefined;
      lastGetRef.current = undefined;
      setAsyncState(DEFAULT_ASYNC_STATE);
    }, []),

    retry: useCallback(async (): Promise<void> => {
      if (typeof lastGetRef.current === 'undefined') {
        return;
      }

      const promise: Promise<void> = getState(lastGetRef.current);
      asyncEffectRef.current = promise;
      await promise;
    }, [getState]),

    set: useCallback((data: T): void => {
      asyncEffectRef.current = undefined;
      lastGetRef.current = undefined;
      setAsyncState({
        data,
        error: undefined,
        initiated: true,
        loading: false,
      });
    }, []),
  };
}
