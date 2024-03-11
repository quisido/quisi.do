'use client';

import {
  type MutableRefObject,
  type PropsWithChildren,
  type ReactElement,
  memo,
  useMemo,
  useRef,
  useState,
} from 'react';
import LocalStorageItem from '../constants/local-storage-item.js';
import { NotificationsProvider } from '../contexts/notifications.js';
import useEffectEvent from '../hooks/use-effect-event.js';
import useLocalStorage from '../hooks/use-local-storage.js';
import type Notification from '../types/notification.js';
import type { WithKey } from '../types/with-key.js';
import append from '../utils/append.js';
import filter from '../utils/filter.js';
import isNot from '../utils/is-not.js';
import QuisidoDotComNotification from './quisido-dot-com-notification.js';

type NotificationState = WithKey<Notification> &
  RequiredDefined<Pick<Notification, 'onDismiss'>>;

type RequiredDefined<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined>;
};

const INITIAL_ID = 0;

function NotificationsProviderFeature({
  children,
}: PropsWithChildren): ReactElement {
  // Contexts
  const [showQuisidoDotCom, setShowQuisidoDotCom] = useLocalStorage(
    LocalStorageItem.QuisidoDotCom,
  );

  // States
  const initialNotifications: readonly WithKey<Notification>[] =
    useMemo((): readonly WithKey<Notification>[] => {
      const newInitialNotifications: WithKey<Notification>[] = [];

      /**
       *   TODO: When ready to display the notification, set this to
       * `!== 'false'`.
       */
      if (showQuisidoDotCom === 'true') {
        newInitialNotifications.push({
          icon: '🧑‍🎨',
          key: 'quisido.com',
          message: <QuisidoDotComNotification />,
          type: 'info',
          onDismiss(): void {
            setShowQuisidoDotCom('false');
          },
        });
      }

      return newInitialNotifications;
    }, [setShowQuisidoDotCom, showQuisidoDotCom]);

  const key: MutableRefObject<number> = useRef(INITIAL_ID);
  const [notifications, setNotifications] =
    useState<readonly WithKey<Notification>[]>(initialNotifications);

  const withRequired = ({
    onDismiss,
    ...notification
  }: Notification): NotificationState => {
    key.current++;
    const newNotification: NotificationState = {
      ...notification,
      key: key.current,
      onDismiss: (): void => {
        setNotifications(filter(isNot<WithKey<Notification>>(newNotification)));
        if (typeof onDismiss === 'function') {
          onDismiss();
        }
      },
    };
    return newNotification;
  };

  const notify = useEffectEvent((notification: Notification): VoidFunction => {
    const newNotification: NotificationState = withRequired(notification);
    setNotifications(append<WithKey<Notification>>(newNotification));

    // Expose the dismiss handler so that it can be bound to other actions.
    return newNotification.onDismiss;
  });

  return (
    <NotificationsProvider
      value={useMemo(
        (): readonly [
          readonly WithKey<Notification>[],
          (notification: Notification) => VoidFunction,
        ] => [notifications, notify],
        [notifications, notify],
      )}
    >
      {children}
    </NotificationsProvider>
  );
}

export default memo(NotificationsProviderFeature);
