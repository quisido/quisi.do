'use client';

import { type Provider } from 'react';
import type Notification from '../types/notification.js';
import createContextUtils from '../utils/create-context-utils/index.js';

const { ContextProvider, useContextValue } =
  createContextUtils<
    readonly [
      readonly Notification[],
      (
        notifications:
          | readonly Notification[]
          | ((
              oldNotifications: readonly Notification[],
            ) => readonly Notification[]),
      ) => void,
    ]
  >();

export const NotificationsProvider: Provider<
  readonly [
    readonly Notification[],
    (
      notifications:
        | readonly Notification[]
        | ((
            oldNotifications: readonly Notification[],
          ) => readonly Notification[]),
    ) => void,
  ]
> = ContextProvider;

export const useNotifications: () => readonly [
  readonly Notification[],
  (
    notifications:
      | readonly Notification[]
      | ((
          oldNotifications: readonly Notification[],
        ) => readonly Notification[]),
  ) => void,
] = useContextValue;
