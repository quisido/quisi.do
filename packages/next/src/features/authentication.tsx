'use client';

import { type PropsWithChildren, type ReactElement } from 'react';
import { AuthenticationProvider } from '../contexts/authentication.js';
import useAsyncState from '../modules/use-async-state/index.js';
import type AuthenticationType from '../types/authentication.js';

/*
const getWhoAmIUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://localhost:1098/whoami';
  }
  return 'https://api.quisi.do/whoami';
};

const whoAmiI = async (): Promise<AuthenticationType> => {
  const url: string = getWhoAmIUrl();
  const response: Response = await fetch(url);
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
*/

export default function AuthenticationFeature({
  children,
}: PropsWithChildren): ReactElement {
  // States
  const state = useAsyncState<AuthenticationType>();

  /*
  const { request } = state;
  useEffect((): void => {
    void request(whoAmiI);
  }, [request]);
  */

  return (
    <AuthenticationProvider value={state}>{children}</AuthenticationProvider>
  );
}
