'use client';

import { type Dispatch, type SetStateAction, createContext } from 'react';
import type DesignSystem from '../constants/design-system.js';

export default createContext<
  [DesignSystem, Dispatch<SetStateAction<DesignSystem>>] | null
>(null);
