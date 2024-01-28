'use client';

import {
  type MutableRefObject,
  type PropsWithChildren,
  type ReactElement,
  useMemo,
  useRef,
  useState,
} from 'react';
import LocalStorageItem from '../constants/local-storage-item.js';
import { NotificationsProvider } from '../contexts/notifications.js';
import useLocalStorage from '../hooks/use-local-storage.js';
import type Notification from '../types/notification.js';
import type { WithKey } from '../types/with-key.js';
import useEffectEvent from '../hooks/use-effect-event.js';
import append from '../utils/append.js';
import isNot from '../utils/is-not.js';
import filter from '../utils/filter.js';

type NotificationState = WithKey<Notification> &
  RequiredDefined<Pick<Notification, 'onDismiss'>>;

type RequiredDefined<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined>;
};

const INITIAL_ID = 0;

function QuisidoDotComNotification(): ReactElement {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'Caveat, serif',
        transform: 'scale(1.25, 1)',
        transformOrigin: '0 50%',
      }}
    >
      Looking for the artist <strong>Jaq Quisido</strong>? Visit{' '}
      <a
        href="https://quisido.com/"
        rel="noopener"
        target="_blank"
        style={{
          color: '#e03060',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}
        title="Jaq Quisido's portfolio"
      >
        quisido.com
      </a>
      .
    </span>
  );
}

export default function NotificationsProviderFeature({
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
      if (showQuisidoDotCom !== 'false') {
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

  const pushNotification = useEffectEvent(
    (notification: Notification): VoidFunction => {
      const newNotification: NotificationState = withRequired(notification);
      setNotifications(append<WithKey<Notification>>(newNotification));

      // Expose the dismiss handler so that it can be bound to other actions.
      return newNotification.onDismiss;
    },
  );

  return (
    <NotificationsProvider
      value={useMemo(
        (): readonly [
          readonly WithKey<Notification>[],
          (notification: Notification) => VoidFunction,
        ] => [notifications, pushNotification],
        [notifications, pushNotification],
      )}
    >
      {children}
    </NotificationsProvider>
  );
}
