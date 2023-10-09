import { type Dispatch, type SetStateAction, useContext } from 'react';
import DarkModeContext from '../contexts/dark-mode';

export default function useDarkMode(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  const darkMode: [boolean, Dispatch<SetStateAction<boolean>>] | null =
    useContext(DarkModeContext);

  if (darkMode === null) {
    throw new Error('Expected the dark mode context to be provided.');
  }

  return darkMode;
}
