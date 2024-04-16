'use client';

import {
  memo,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { NotificationsProvider } from '../contexts/notifications.js';
import useEffectEvent from '../hooks/use-effect-event.js';
import useHash from '../hooks/use-hash.js';
import type Notification from '../types/notification.js';
import type { WithKey } from '../types/with-key.js';
import append from '../utils/append.js';
import filter from '../utils/filter.js';
import isNot from '../utils/is-not.js';
import { mapUnknownToString } from 'fmrs';
import type AuthnErrorNotification from './authn-error-notification.js';

type NotificationState = WithKey<Notification> &
  RequiredDefined<Pick<Notification, 'onDismiss'>>;

type RequiredDefined<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined>;
};

const INITIAL_ID = 0;
const INITIAL_NOTIFICATIONS: readonly WithKey<Notification>[] = [];

const loadAuthnErrorNotification = async (): Promise<{
  default: typeof AuthnErrorNotification;
}> => import('./authn-error-notification.js');

const mapErrorToNotification = (err: unknown): WithKey<Notification> => {
  return {
    icon: '⚠',
    key: 'authn:error',
    type: 'error',
    Message(): string {
      return mapUnknownToString(err);
    },
  };
};

function NotificationsProviderFeature({
  children,
}: PropsWithChildren): ReactElement {
  // Contexts
  const [hash, setHash] = useHash();

  // States
  const key: MutableRefObject<number> = useRef(INITIAL_ID);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Callbacks
  const dismiss = useEffectEvent(
    (notification: WithKey<Notification>): void => {
      setNotifications(filter(isNot<WithKey<Notification>>(notification)));
      if (typeof notification.onDismiss === 'function') {
        notification.onDismiss();
      }
    },
  );

  const notify = useEffectEvent((notification: Notification): VoidFunction => {
    key.current++;
    const newNotification: WithKey<Notification> = {
      key: key.current,
      ...notification,
    };

    setNotifications(append<WithKey<Notification>>(newNotification));

    // Expose the dismiss handler so that it can be bound to other actions.
    return (): void => {
      dismiss(newNotification);
    };
  });

  return (
    <NotificationsProvider
      value={useMemo((): readonly [
        readonly (Promise<NotificationState> | NotificationState)[],
        (notification: Notification) => VoidFunction,
      ] => {
        const newNotifications: (
          | Promise<WithKey<Notification>>
          | WithKey<Notification>
        )[] = [...notifications];

        if (/^#authn:error=\d+$/.test(hash)) {
          newNotifications.push(
            loadAuthnErrorNotification()
              .then(
                ({ default: AuthnErrorNotification }): WithKey<Notification> =>
                  AuthnErrorNotification.fromHash(hash, {
                    onDismiss(): void {
                      setHash('replace', '');
                    },
                  }),
              )
              .catch(mapErrorToNotification),
          );
        }

        const mapToDismissable = (
          notification: Promise<WithKey<Notification>> | WithKey<Notification>,
        ): Promise<NotificationState> | NotificationState => {
          if (notification instanceof Promise) {
            return notification.then(mapToDismissable);
          }

          return {
            ...notification,
            onDismiss(): void {
              dismiss(notification);
            },
          };
        };

        return [newNotifications.map(mapToDismissable), notify];
      }, [dismiss, hash, notifications, notify, setHash])}
    >
      {children}
    </NotificationsProvider>
  );
}

export default memo(NotificationsProviderFeature);
