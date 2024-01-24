import { type Dispatch, type SetStateAction, useContext } from 'react';
import DarkMode from '../contexts/dark-mode.js';

export default function useDarkMode(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  const darkMode: [boolean, Dispatch<SetStateAction<boolean>>] | null =
    useContext(DarkMode);

  if (darkMode === null) {
    throw new Error('Expected the dark mode context to be provided.');
  }

  return darkMode;
}
