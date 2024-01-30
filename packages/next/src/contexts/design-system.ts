'use client';

import { type Dispatch, type SetStateAction } from 'react';
import type DesignSystem from '../constants/design-system.js';
import createContextUtils from '../utils/create-context-utils/create-context-utils.js';

export const {
  ContextProvider: DesignSystemProvider,
  useContextValue: useDesignSystem,
} =
  createContextUtils<[DesignSystem, Dispatch<SetStateAction<DesignSystem>>]>();
