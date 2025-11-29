import type { Provider } from 'react';
import createContextUtils from '../modules/create-context-utils/index.js';
import type Notification from '../types/notification.js';
import { type WithKey } from '../types/with-key.js';

type Notifications = readonly [
  readonly (Promise<WithKey<Notification>> | WithKey<Notification>)[],
  (notification: Notification) => VoidFunction,
];

const { ContextProvider, useContextValue } =
  createContextUtils<Notifications>();

export const NotificationsProvider: Provider<Notifications> = ContextProvider;
export const useNotifications: () => Notifications = useContextValue;
