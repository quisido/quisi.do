import { useCallback, useRef, type MutableRefObject } from 'react';

export default function useEffectEvent<A extends readonly unknown[], R>(
  fn: (...args: A) => R,
): (...args: A) => R {
  const fRef: MutableRefObject<(...args: A) => R> = useRef(fn);
  fRef.current = fn;

  return useCallback((...args: A): R => fRef.current(...args), []);
}
