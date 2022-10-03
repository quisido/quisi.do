import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import DarkModeContext from '../contexts/dark-mode';

export default function useDarkMode(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  return useContext(DarkModeContext);
}
