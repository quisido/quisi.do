import I18n from 'lazy-i18n';
import { type ReactElement, type RefObject, useEffect, useState } from 'react';
import useMountedRef from '../hooks/use-mounted-ref.js';
import mapErrorToNotification from '../utils/map-error-to-notification.js';
import Notification from './notification.js';
import type NotificationType from '../types/notification.js';
import type { NotificationProps } from '../contexts/notifications.js';
import noop from '../utils/noop.js';

interface LazyNotificationProps {
  readonly children: Promise<NotificationProps>;
}

const LOADING_NOTIFICATION: NotificationProps = {
  description: 'This notification is loading.',
  icon: '⏳',
  Message(): ReactElement {
    return <I18n>Loading</I18n>;
  },
  onDismiss: noop,
  type: 'info',
};

export default function LazyNotification({
  children,
}: LazyNotificationProps): ReactElement | null {
  // States
  const isMountedRef: RefObject<boolean> = useMountedRef();
  const [notification, setNotification] = useState<NotificationProps | null>(
    LOADING_NOTIFICATION,
  );

  // Effects
  useEffect((): void => {
    void children.then(setNotification).catch((err: unknown): void => {
      if (!isMountedRef.current) {
        return;
      }

      const errorNotification: NotificationType = mapErrorToNotification(err);
      setNotification({
        ...errorNotification,
        onDismiss: (): void => {
          setNotification(null);
        },
      });
    });
  }, [children, isMountedRef]);

  /**
   *   Technical debt: The `onDismiss` handler for lazy notifications should not
   * require a successful Promise resolution. Consider a shape like
   * `[Promise, { onDismiss }]` that always exposes `onDismiss`.
   *   If an error occurred while loading the notification, then that error was
   * dismissed.
   */
  if (notification === null) {
    return null;
  }

  return <Notification {...notification} />;
}
