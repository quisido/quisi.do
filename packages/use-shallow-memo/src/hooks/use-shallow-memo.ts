'use client';

import { useMemo } from 'react';
import mapObjectToDependencies from '../utils/map-object-to-dependencies.js';

export default function useShallowMemo<T extends object>(obj: T): T {
  return useMemo((): T => obj, mapObjectToDependencies(obj));
}
