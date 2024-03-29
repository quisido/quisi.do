'use client';

import { useEffect, type PropsWithChildren, type ReactElement } from 'react';
import { AuthenticationProvider } from '../contexts/authentication.js';
import useAsyncState from '../modules/use-async-state/index.js';
import type AuthenticationType from '../types/authentication.js';
import isObject from '../utils/is-object.js';
import validateString from '../utils/validate-string.js';

const UNAUTHENTICATED_CODE = 5;
const WHOAMI: string = validateString(process.env['WHOAMI']);

export default function AuthenticationFeature({
  children,
}: PropsWithChildren): ReactElement {
  // States
  const state = useAsyncState<AuthenticationType>();

  const { request } = state;
  useEffect((): void => {
    void request(async (): Promise<AuthenticationType> => {
      const response: Response = await fetch(WHOAMI);
      const json: unknown = await response.json();
      if (!isObject(json)) {
        throw new Error('You do not have data.');
      }

      if ('code' in json && json.code === UNAUTHENTICATED_CODE) {
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
  }, [request]);

  return (
    <AuthenticationProvider value={state}>{children}</AuthenticationProvider>
  );
}
