'use client';

import type Notification from '../types/notification.js';
import type { WithKey } from '../types/with-key.js';
import createContextUtils from '../utils/create-context-utils/index.js';

type Notifications = readonly [
  readonly (Promise<WithKey<Notification>> | WithKey<Notification>)[],
  (notification: Notification) => VoidFunction,
];

export const {
  ContextProvider: NotificationsProvider,
  useContextValue: useNotifications,
} = createContextUtils<Notifications>();
