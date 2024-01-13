'use client';

import { type PropsWithChildren, type ReactElement, useState } from 'react';
import EMPTY_ARRAY from '../../constants/empty-array.js';
import { NotificationsProvider } from '../../contexts/notifications.js';
import type Notification from '../../types/notification.js';

export default function AppNotificationsProvider({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <NotificationsProvider
      value={useState<readonly Notification[]>(EMPTY_ARRAY)}
    >
      {children}
    </NotificationsProvider>
  );
}
