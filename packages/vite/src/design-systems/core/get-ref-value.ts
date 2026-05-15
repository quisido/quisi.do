import type { RefObject } from 'react';

export default function getRefValue<T>({ current }: RefObject<T | null>): T {
  if (current === null) {
    throw new Error('Expected a ref value.');
  }

  return current;
}
