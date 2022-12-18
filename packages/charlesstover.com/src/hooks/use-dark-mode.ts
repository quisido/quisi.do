import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import DarkModeContext from '../contexts/dark-mode';

const MISSING_DARK_MODE_CONTEXT_ERROR: Error = new Error(
  'Expected the dark mode context to be provided.',
);

export default function useDarkMode(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  const darkMode: [boolean, Dispatch<SetStateAction<boolean>>] | null =
    useContext(DarkModeContext);

  if (darkMode === null) {
    throw MISSING_DARK_MODE_CONTEXT_ERROR;
  }

  return darkMode;
}
