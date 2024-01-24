'use client';

import {
  type MutableRefObject,
  type PropsWithChildren,
  type ReactElement,
  useRef,
} from 'react';
import useNotify from '../../hooks/use-notify.js';
import useEffectEvent from '../../hooks/use-effect-event.js';
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
  const emitNotification = useNotify();

  // State
  const removeRef: MutableRefObject<VoidFunction> = useRef(noop);
  const notify = useEffectEvent((notification: Notification): void => {
    removeRef.current();
    removeRef.current = emitNotification(notification);
  });

  return (
    <Turnstile
      onError={(code: number): void => {
        // https://developers.cloudflare.com/turnstile/reference/client-side-errors/
        switch (code) {
          case CHALLENGE_TIMEOUT:
            notify({
              type: 'warning',
              Header(): ReactElement {
                return <>🐱‍👤 Are you still human?</>;
              },
              message:
                'You probably left this tab open while doing something else.',
            });
            break;
          default:
            notify({
              type: 'error',
              Header(): ReactElement {
                return <>🤖 You may be a robot.</>;
              },
              message: (
                <>
                  <p>Turnstile failed to verify you.</p>
                  <p>Code: {code}</p>
                </>
              ),
            });
            break;
        }
      }}
      onExpired={(): void => {
        notify({
          message: 'Your Turnstile session has expired.',
          type: 'warning',
          Header(): ReactElement {
            return <>🐱‍👤 Are you still human?</>;
          },
        });
      }}
      onSuccess={(): void => {
        notify({
          message: 'Turnstile has validated your session.',
          type: 'info',
          Header(): ReactElement {
            return <>🧑 You are human!</>;
          },
        });
      }}
      onTimeout={(...args: readonly unknown[]): void => {
        notify({
          type: 'error',
          Header(): ReactElement {
            return <>You may be 🤖.</>;
          },
          message: (
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
          ),
        });
      }}
      onUnsupported={(...args: readonly unknown[]): void => {
        notify({
          type: 'error',
          Header(): ReactElement {
            return <>You may be 🤖.</>;
          },
          message: (
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
          ),
        });
      }}
      sitekey="0x4AAAAAAAK2L9AbDrFo9T77"
      theme="dark"
    >
      {children}
    </Turnstile>
  );
}
