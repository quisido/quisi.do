import { isNot } from 'fmrs';
import {
  type PropsWithChildren,
  type ReactElement,
  type RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type NotificationProps,
  NotificationsProvider,
} from '../contexts/notifications.js';
import useHash from '../hooks/use-hash.js';
import type Notification from '../types/notification.js';
import { type WithKey } from '../types/with-key.js';
import append from '../utils/append.js';
import filter from '../utils/filter.js';
import mapErrorToNotification from '../utils/map-error-to-notification.js';
import type AuthnErrorNotification from './authn-error-notification.js';

const INITIAL_NOTIFICATIONS: readonly never[] = [];

const loadAuthnErrorNotificationModule = async (): Promise<{
  default: typeof AuthnErrorNotification;
}> => import('./authn-error-notification.js');

export default function NotificationsProviderFeature({
  children,
}: PropsWithChildren): ReactElement {
  // Contexts
  const [hash, setHash] = useHash();

  // States
  const key: RefObject<number> = useRef(0);
  const [notifications, setNotifications] = useState<
    readonly WithKey<NotificationProps>[]
  >(INITIAL_NOTIFICATIONS);

  // Callbacks
  const dismiss = (notification: WithKey<NotificationProps>): void => {
    setNotifications(filter(isNot<WithKey<NotificationProps>>(notification)));
    notification.onDismiss();
  };

  const notify = useCallback((notification: Notification): VoidFunction => {
    key.current += 1;
    const newNotification: WithKey<NotificationProps> = {
      key: key.current,
      ...notification,
      onDismiss: (): void => {
        dismiss(newNotification);
      },
    };

    setNotifications(append<WithKey<NotificationProps>>(newNotification));

    // Expose the dismiss handler so that it can be bound to other actions.
    return (): void => {
      dismiss(newNotification);
    };
  }, []);

  return (
    <NotificationsProvider
      value={useMemo((): readonly [
        readonly (
          | Promise<WithKey<NotificationProps>>
          | WithKey<NotificationProps>
        )[],
        (notification: Notification) => VoidFunction,
      ] => {
        const newNotifications: (
          | Promise<WithKey<NotificationProps>>
          | WithKey<NotificationProps>
        )[] = [...notifications];

        if (/^#authn:error=\d+$/u.test(hash)) {
          const handleDismiss = (): void => {
            setHash('replace', '');
          };

          newNotifications.push(
            loadAuthnErrorNotificationModule()
              .then(
                ({ default: AuthnErrorNotification }): Notification =>
                  AuthnErrorNotification.fromHash(hash),
              )
              .catch(mapErrorToNotification)
              .then(
                (notification: Notification): WithKey<NotificationProps> => ({
                  ...notification,
                  key: 'authn:error',
                  onDismiss: handleDismiss,
                }),
              ),
          );
        }

        const mapToDismissable = (
          notification: Promise<WithKey<Notification>> | WithKey<Notification>,
        ): Promise<WithKey<NotificationProps>> | WithKey<NotificationProps> => {
          if (notification instanceof Promise) {
            return notification.then(mapToDismissable);
          }

          const newNotification: WithKey<NotificationProps> = {
            ...notification,
            onDismiss(): void {
              dismiss(newNotification);
            },
          };

          return newNotification;
        };

        return [newNotifications.map(mapToDismissable), notify];
      }, [hash, notifications, notify, setHash])}
    >
      {children}
    </NotificationsProvider>
  );
}
