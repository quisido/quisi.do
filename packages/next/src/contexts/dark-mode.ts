'use client';

import { type Dispatch, type SetStateAction, createContext } from 'react';

const DarkModeContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

export default DarkModeContext;
