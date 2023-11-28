'use client';

import { type ReactElement, memo, useEffect, useState } from 'react';
import { useNotifications } from '../contexts/notifications.js';
import Notification from './notifications/notification.js';
import type NotificationType from '../types/notification.js';
import type { WithKey } from '../types/with-key.js';
import I18n from 'lazy-i18n';
import mapErrorToNotification from '../utils/map-error-to-notification.js';

interface LazyNotificationProps {
  readonly children: Promise<NotificationType>;
}

const LOADING_NOTIFICATION: NotificationType = {
  icon: '⏳',
  type: 'info',
  Message(): ReactElement {
    return <I18n>Loading</I18n>;
  },
};

function LazyNotification({ children }: LazyNotificationProps): ReactElement {
  const [notification, setNotification] =
    useState<NotificationType>(LOADING_NOTIFICATION);

  // Technical debt: `useIsMounted` to determine if this component is still mounted.
  useEffect((): void => {
    void children.then(setNotification).catch((err: unknown): void => {
      setNotification(mapErrorToNotification(err));
    });
  }, [children]);

  return <Notification {...notification} />;
}

const mapNotificationToElement = (
  notification: Promise<WithKey<NotificationType>> | WithKey<NotificationType>,
): ReactElement => {
  if (notification instanceof Promise) {
    return <LazyNotification>{notification}</LazyNotification>;
  }
  return <Notification {...notification} />;
};

function Notifications(): ReactElement {
  // Context
  const [notifications] = useNotifications();

  return (
    <div
      style={{
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
    >
      {notifications.map(mapNotificationToElement)}
    </div>
  );
}

export default memo(Notifications);
