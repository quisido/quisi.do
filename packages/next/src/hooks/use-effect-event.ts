import { useCallback, useRef, type RefObject } from 'react';

export default function useEffectEvent<A extends readonly unknown[], R>(
  fn: (...args: A) => R,
): (...args: A) => R {
  const fRef: RefObject<(...args: A) => R> = useRef(fn);
  fRef.current = fn;

  return useCallback((...args: A): R => fRef.current(...args), []);
}
