import { useMemo } from 'react';
import mapValueToDependencies from '../utils/map-value-to-dependencies.js';

export default function useShallowMemo<
  T extends boolean | null | number | object | string | undefined,
>(obj: T): T {
  // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
  return useMemo((): T => obj, mapValueToDependencies(obj));
}
