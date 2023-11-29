'use client';

import { type PropsWithChildren, type ReactElement, useState } from 'react';
import EMPTY_ARRAY from '../../constants/empty-array';
import { NotificationsProvider } from '../../contexts/notifications';
import type Notification from '../../types/notification';

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
