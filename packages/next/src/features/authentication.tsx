'use client';

import { type PropsWithChildren, type ReactElement, useEffect } from 'react';
import useAsyncState from '../modules/use-async-state/index.js';
import type AuthenticationType from '../types/authentication.js';
import { AuthenticationProvider } from '../contexts/authentication.js';
import isObject from '../utils/is-object.js';

const whoAmiI = async (): Promise<AuthenticationType> => {
  // fetch('https://localhost:1098/whoami')
  const response: Response = await fetch('https://api.quisi.do/whoami');
  const json: unknown = await response.json();
  if (!isObject(json)) {
    throw new Error('You do not have data.');
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
};

export default function AuthenticationFeature({
  children,
}: PropsWithChildren): ReactElement {
  const state = useAsyncState<AuthenticationType>();

  const { request } = state;
  useEffect((): void => {
    void request(whoAmiI);
  }, [request]);

  return (
    <AuthenticationProvider value={state}>{children}</AuthenticationProvider>
  );
}
