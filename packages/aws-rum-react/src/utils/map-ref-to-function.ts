import type { MutableRefObject } from 'react';

export default function mapRefToFunction<P extends unknown[], T>(
  ref: MutableRefObject<(...args: P) => T>,
): (...args: P) => T {
  return function refFunction(...args: P): T {
    return ref.current(...args);
  };
}
