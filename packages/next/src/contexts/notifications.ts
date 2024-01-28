'use client';

import { type Dispatch, type SetStateAction } from 'react';
import type Notification from '../types/notification.js';
import createContextUtils from '../utils/create-context-utils/index.js';
import type { WithKey } from '../types/with-key.js';

type Notifications = readonly [
  readonly WithKey<Notification>[],
  (notification: Notification) => VoidFunction,
];

export const {
  ContextProvider: NotificationsProvider,
  useContextValue: useNotifications,
} = createContextUtils<Notifications>();
