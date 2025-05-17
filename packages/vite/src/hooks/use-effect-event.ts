import { useCallback, useLayoutEffect, useRef, type RefObject } from 'react';

export default function useEffectEvent<A extends readonly unknown[], T>(
  fn: (...args: A) => T,
): (...args: A) => T {
  const fnRef: RefObject<(...args: A) => T> = useRef(fn);

  useLayoutEffect((): void => {
    fnRef.current = fn;
  }, [fn]);

  return useCallback((...args: A): T => {
    return fnRef.current(...args);
  }, []);
}
