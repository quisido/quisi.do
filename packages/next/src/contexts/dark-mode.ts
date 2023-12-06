'use client';

import { type Dispatch, type SetStateAction, createContext } from 'react';

export default createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);
