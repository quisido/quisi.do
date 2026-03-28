import { type ReactElement } from 'react';
import LazyNotification from '../components/lazy-notification.js';
import Notification from '../components/notification.js';
import type { WithKey } from '../types/with-key.js';
import type { NotificationProps } from '../contexts/notifications.js';

export default function mapNotificationToElement(
  notification:
    | Promise<WithKey<NotificationProps>>
    | WithKey<NotificationProps>,
): ReactElement {
  if (notification instanceof Promise) {
    return <LazyNotification>{notification}</LazyNotification>;
  }

  return <Notification {...notification} />;
}
