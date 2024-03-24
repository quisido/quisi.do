'use client';

import {
  memo,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { NotificationsProvider } from '../contexts/notifications.js';
import useEffectEvent from '../hooks/use-effect-event.js';
import useHash from '../hooks/use-hash.js';
import type Notification from '../types/notification.js';
import type { WithKey } from '../types/with-key.js';
import append from '../utils/append.js';
import filter from '../utils/filter.js';
import isNot from '../utils/is-not.js';

type NotificationState = WithKey<Notification> &
  RequiredDefined<Pick<Notification, 'onDismiss'>>;

type RequiredDefined<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined>;
};

const INITIAL_ID = 0;
const INITIAL_NOTIFICATIONS: readonly WithKey<Notification>[] = [];

const mapHashToDetails = (
  hash: string,
):
  | readonly [null | string, ReactNode, string]
  | readonly [null | string, ReactNode]
  | undefined => {
  switch (hash) {
    case 'authn:error=1':
      return [null, 'MESSAGE'];

    case 'authn:error=2':
      return [
        null,
        'The authentication API isolate environment could not be found.',
      ];

    case 'authn:error=3':
      return [null, 'MESSAGE'];

    case 'authn:error=4':
      return [
        null,
        'The authentication API could not connect to its analytics engine dataset.',
      ];

    case 'authn:error=5':
      return [
        null,
        'The authentication API could not establish its target host.',
      ];

    case 'authn:error=6':
      return [null, 'Your IP address could not be identified.', '🕵️'];

    case 'authn:error=7':
      return [null, 'You must enable cookies before authenticating.', '🍪'];

    case 'authn:error=8':
      return [null, 'MESSAGE'];

    case 'authn:error=9':
      return [null, 'MESSAGE'];

    case 'authn:error=10':
      return [null, 'MESSAGE'];

    case 'authn:error=11':
      return [null, 'MESSAGE'];

    case 'authn:error=12':
      return [null, 'MESSAGE'];

    case 'authn:error=13':
      return [
        'Cross-site request forgery',
        'It appears as if someone tried to authenticate on your behalf.',
      ];

    case 'authn:error=14':
      return [
        null,
        'The authentication API could not connect to its namespace.',
      ];

    case 'authn:error=15':
      return [
        null,
        'The authentication API could not connect to its database.',
      ];

    case 'authn:error=16':
      return [
        null,
        <>
          The authentication API could not establish its cookies&apos; domain.
        </>,
        '🍪',
      ];

    case 'authn:error=17':
      return [null, 'MESSAGE'];

    case 'authn:error=18':
      return [null, 'MESSAGE'];

    case 'authn:error=19':
      return [null, 'MESSAGE'];

    case 'authn:error=20':
      return [null, 'MESSAGE'];

    case 'authn:error=21':
      return [null, 'The authentication request was missing a grant code.'];

    case 'authn:error=22':
      return [null, 'MESSAGE'];

    case 'authn:error=23':
      return [null, 'MESSAGE'];

    case 'authn:error=24':
      return [null, 'MESSAGE'];

    case 'authn:error=25':
      return [
        'Invalid Patreon client ID',
        'The Patreon client could not be found.',
      ];

    case 'authn:error=26':
      return [null, 'Patreon rejected the provided grant code.'];

    case 'authn:error=27':
      return [null, 'MESSAGE'];

    case 'authn:error=28':
      return [null, 'MESSAGE'];

    case 'authn:error=29':
      return [null, 'Patreon rejected the OAuth token request.'];

    case 'authn:error=30':
      return [null, 'MESSAGE'];

    case 'authn:error=31':
      return [null, 'MESSAGE'];

    case 'authn:error=32':
      return [null, 'MESSAGE'];

    case 'authn:error=33':
      return [null, 'MESSAGE'];

    case 'authn:error=34':
      return [null, 'MESSAGE'];

    case 'authn:error=35':
      return [
        null,
        'Patreon failed to authenticate you. This is not your fault.',
      ];

    case 'authn:error=36':
      return [null, 'MESSAGE'];

    case 'authn:error=37':
      return [null, 'MESSAGE'];

    case 'authn:error=38':
      return [null, 'MESSAGE'];

    case 'authn:error=39':
      return [null, 'MESSAGE'];

    case 'authn:error=40':
      return [null, 'Patreon did not provide any user attributes.'];

    case 'authn:error=41':
      return [null, 'MESSAGE'];

    case 'authn:error=42':
      return [null, 'MESSAGE'];

    case 'authn:error=43':
      return [null, 'MESSAGE'];

    case 'authn:error=44':
      return [null, 'MESSAGE'];

    case 'authn:error=45':
      return [null, 'MESSAGE'];

    case 'authn:error=46':
      return [null, 'MESSAGE'];

    case 'authn:error=47':
      return [null, 'MESSAGE'];

    case 'authn:error=48':
      return [null, 'MESSAGE'];

    case 'authn:error=49':
      return [null, 'MESSAGE'];

    case 'authn:error=50':
      return [null, 'MESSAGE'];

    case 'authn:error=51':
      return [null, 'MESSAGE'];

    case 'authn:error=52':
      return [null, 'MESSAGE'];

    case 'authn:error=53':
      return [null, 'MESSAGE'];

    case 'authn:error=404':
      return [null, 'MESSAGE'];

    case 'authn:error=405':
      return [
        'Method Not Allowed',
        'You attempted to authenticate via an unsupported HTTP method.',
      ];

    case 'authn:error=429':
      return [null, 'MESSAGE'];
  }
  return;
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
        readonly NotificationState[],
        (notification: Notification) => VoidFunction,
      ] => {
        const newNotifications: WithKey<Notification>[] = [...notifications];

        const hashDetails:
          | readonly [null | string, ReactNode, string]
          | readonly [null | string, ReactNode]
          | undefined = mapHashToDetails(hash);
        if (typeof hashDetails !== 'undefined') {
          const [header, message, icon = '⚠️'] = hashDetails;
          newNotifications.push({
            icon,
            key: hash,
            message,
            type: 'error',
            Header:
              header === null
                ? undefined
                : function Header(): string {
                    return header;
                  },
            onDismiss(): void {
              setHash('replace', '');
            },
          });
        }

        const mapToDismissable = (
          notification: WithKey<Notification>,
        ): NotificationState => ({
          ...notification,
          onDismiss(): void {
            dismiss(notification);
          },
        });

        return [newNotifications.map(mapToDismissable), notify];
      }, [dismiss, hash, notifications, notify, setHash])}
    >
      {children}
    </NotificationsProvider>
  );
}

export default memo(NotificationsProviderFeature);
