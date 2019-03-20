'use client';

import { type Dispatch, type SetStateAction } from 'react';
import createContextUtils from '../utils/create-context-utils';

export const {
  ContextProvider: DarkModeProvider,
  useContextValue: useDarkMode,
} = createContextUtils<[boolean, Dispatch<SetStateAction<boolean>>]>();
