import { type Provider } from 'react';

import createContextUtils from '../modules/create-context-utils/index.js';
import { type AsyncState } from '../modules/use-async-state/index.js';
import type Authentication from '../types/authentication.js';

const { ContextProvider, useContextValue } =
  createContextUtils<AuthenticationState>();

export type AuthenticationState = AsyncState<Authentication>;

export const AuthenticationProvider: Provider<AuthenticationState> =
  ContextProvider;

export const useAuthentication: () => AuthenticationState = useContextValue;
