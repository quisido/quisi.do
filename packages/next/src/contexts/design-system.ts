'use client';

import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import type DesignSystem from '../constants/design-system';

const DesignSystemContext = createContext<
  [DesignSystem, Dispatch<SetStateAction<DesignSystem>>] | null
>(null);

export default DesignSystemContext;
