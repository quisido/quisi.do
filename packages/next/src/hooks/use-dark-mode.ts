import type { Dispatch, SetStateAction } from 'react';
import useLocalStorage from './use-local-storage.js';

const mapBooleanToString = (value: boolean): string => value.toString();
const parseBoolean = (value: string): boolean => value === 'true';

export default function useDarkMode(): readonly [
  boolean | null,
  Dispatch<SetStateAction<boolean | null>>,
] {
  return useLocalStorage('dark-mode', parseBoolean, mapBooleanToString);
}
