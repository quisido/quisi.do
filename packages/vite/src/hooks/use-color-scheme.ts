import type { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from '../modules/use-local-storage/index.js';

export default function useColorScheme(): readonly [
  string | null,
  Dispatch<SetStateAction<string | null>>,
] {
  return useLocalStorage('color-scheme');
}
