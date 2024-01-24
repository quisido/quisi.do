'use client';

import { type Dispatch, type SetStateAction } from 'react';
import type Notification from '../types/notification.js';
import createContextUtils from '../utils/create-context-utils/index.js';

type Notifications = readonly [
  readonly Notification[],
  Dispatch<SetStateAction<readonly Notification[]>>,
];

export const {
  ContextProvider: NotificationsProvider,
  useContextValue: useNotifications,
} = createContextUtils<Notifications>();
