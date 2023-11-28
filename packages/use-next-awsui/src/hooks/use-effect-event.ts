'use client';

import type { MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';

export default function useEffectEvent<A extends readonly unknown[], R>(
  f: (...args: A) => R,
): (...args: A) => R {
  const fRef: MutableRefObject<(...args: A) => R> = useRef(f);
  fRef.current = f;

  return useCallback((...args: A): R => fRef.current(...args), []);
}
