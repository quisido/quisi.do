import {
  type PropsWithChildren,
  type ReactElement,
  type RefObject,
  useRef,
} from 'react';
import { useNotifications } from '../../contexts/notifications.js';
import Turnstile from '../../modules/react-turnstile-invis/index.js';
import type Notification from '../../types/notification.js';
import noop from '../../utils/noop.js';

/**
 * Technical debt: If this banner is always present, we could generate it with
 *   `useMemo` in the `<Notifications />` component by consuming the Turnstile
 *   context.
 */

const CHALLENGE_TIMEOUT = 110600;

export default function AppTurnstile({
  children,
}: PropsWithChildren): ReactElement {
  // Contexts
  const [, emitNotification] = useNotifications();

  // State
  const removeRef: RefObject<VoidFunction> = useRef(noop);
  const notify = (notification: Notification): void => {
    removeRef.current();
    removeRef.current = emitNotification(notification);
  };

  return (
    <Turnstile
      onError={(code: number): void => {
        // https://developers.cloudflare.com/turnstile/reference/client-side-errors/
        switch (code) {
          case CHALLENGE_TIMEOUT:
            notify({
              description: 'Your session has timed out.',
              Header(): ReactElement {
                return <>🐱‍👤 Are you still human?</>;
              },
              Message(): string {
                return 'You probably left this tab open while doing something else.';
              },
              type: 'warning',
            });
            break;

          default:
            notify({
              description: 'Your session could not be verified.',
              Header(): ReactElement {
                return <>🤖 You may be a robot.</>;
              },
              Message(): ReactElement {
                return (
                  <>
                    <p>Turnstile failed to verify you.</p>
                    <p>Code: {code}</p>
                  </>
                );
              },
              type: 'error',
            });
            break;
        }
      }}
      onExpired={(): void => {
        notify({
          description: 'Your session has expired.',
          Header(): ReactElement {
            return <>🐱‍👤 Are you still human?</>;
          },
          Message(): string {
            return 'Your Turnstile session has expired.';
          },
          type: 'warning',
        });
      }}
      onSuccess={(): void => {
        notify({
          description: 'Your session has been validated.',
          Header(): ReactElement {
            return <>🧑 You are human!</>;
          },
          Message(): string {
            return 'Turnstile has validated your session.';
          },
          type: 'info',
        });
      }}
      onTimeout={(...args: readonly unknown[]): void => {
        notify({
          description: 'Your session has timed out.',
          Header(): ReactElement {
            return <>You may be 🤖.</>;
          },
          Message(): ReactElement {
            return (
              <>
                <p>Turnstile timed out.</p>
                <ul>
                  {args.map(
                    (arg: unknown, index: number): ReactElement => (
                      <li key={index}>
                        {typeof arg} {JSON.stringify(arg)}
                      </li>
                    ),
                  )}
                </ul>
              </>
            );
          },
          type: 'error',
        });
      }}
      onUnsupported={(...args: readonly unknown[]): void => {
        notify({
          description: 'Your device is not supported.',
          Header(): ReactElement {
            return <>You may be 🤖.</>;
          },
          Message(): ReactElement {
            return (
              <>
                <p>Turnstile does not support your device.</p>
                <ul>
                  {args.map(
                    (arg: unknown, index: number): ReactElement => (
                      <li key={index}>
                        {typeof arg} {JSON.stringify(arg)}
                      </li>
                    ),
                  )}
                </ul>
              </>
            );
          },
          type: 'error',
        });
      }}
      sitekey="0x4AAAAAAAK2L9AbDrFo9T77"
      theme="dark"
    >
      {children}
    </Turnstile>
  );
}
