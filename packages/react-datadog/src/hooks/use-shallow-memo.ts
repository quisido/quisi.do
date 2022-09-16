import type { MutableRefObject } from 'react';
import { useRef } from 'react';
import mapObjectToEntries from '../utils/map-object-to-entries';

export default function useShallowMemo<T extends Record<string, unknown>>(
  obj: T,
): T {
  const objRef: MutableRefObject<T> = useRef(obj);

  for (const [key, value] of mapObjectToEntries(obj)) {
    if (objRef.current[key] !== value) {
      objRef.current = obj;
      return obj;
    }
  }

  return objRef.current;
}
