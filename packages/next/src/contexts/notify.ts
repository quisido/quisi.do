'use client';

import type { Provider } from 'react';
import type Notification from '../types/notification';
import createContextUtils from '../utils/create-context-utils';

const { ContextProvider, useContextValue } =
  createContextUtils<(notification: Notification) => void>();

export const NotifyProvider: Provider<(notification: Notification) => void> =
  ContextProvider;

export const useNotify: () => (notification: Notification) => void =
  useContextValue;
