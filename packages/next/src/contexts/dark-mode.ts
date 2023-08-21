import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

const DarkModeContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

export default DarkModeContext;
