import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { isObject } from 'fmrs';
import { useEffect, type PropsWithChildren, type ReactElement } from 'react';
import { WHOAMI } from '../constants/whoami.js';
import { AuthenticationProvider } from '../contexts/authentication.js';
import useEffectEvent from '../hooks/use-effect-event.js';
import useAsyncState from '../modules/use-async-state/index.js';
import type AuthenticationType from '../types/authentication.js';

const isUnauthenticatedResponseCode = (code: unknown): boolean =>
  code === WhoAmIResponseCode.InvalidAuthnId ||
  code === WhoAmIResponseCode.MissingAuthnId ||
  code === WhoAmIResponseCode.Throttled;

export default function AuthenticationFeature({
  children,
}: PropsWithChildren): ReactElement {
  // States
  const state = useAsyncState<AuthenticationType>();

  const requestEvent = useEffectEvent(state.request);
  useEffect((): void => {
    void requestEvent(async (): Promise<AuthenticationType> => {
      const response: Response = await fetch(WHOAMI, {
        credentials: 'include',
        redirect: 'error',
      });

      /**
       *   Technical debt: We want to emit the following errors, but our
       * monitoring services depend on our authentication. 🥲
       */
      const json: unknown = await response.json();
      if (!isObject(json)) {
        throw new Error('You do not have data.');
      }

      if ('code' in json && isUnauthenticatedResponseCode(json.code)) {
        return {
          id: null,
        };
      }

      if (!('id' in json)) {
        throw new Error('Your ID is missing.');
      }

      const { id } = json;
      if (typeof id !== 'number') {
        throw new Error('Your ID is invalid.');
      }

      return {
        ...json,
        id,
      };
    });
  }, [requestEvent]);

  return (
    <AuthenticationProvider value={state}>{children}</AuthenticationProvider>
  );
}
