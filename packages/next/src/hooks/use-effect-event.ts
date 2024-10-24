import { experimental_useEffectEvent } from 'react';

export default function useEffectEvent<A extends readonly unknown[], T>(
  fn: (...args: A) => T,
): (...args: A) => T {
  return experimental_useEffectEvent(fn);
}
