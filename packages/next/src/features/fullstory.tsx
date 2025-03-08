'use client';

import { Fullstory } from 'fullstory-react';
import { memo, type PropsWithChildren, type ReactNode } from 'react';
import {
  useAuthentication,
  type AuthenticationState,
} from '../contexts/authentication.js';
import type Authentication from '../types/authentication.js';

interface AuthenticatedState {
  readonly identity: Authentication;
  readonly identityUid: string;
}

type State = AuthenticatedState | Record<string, never>;

function useFullstory(): State {
  // Contexts
  const authn: AuthenticationState = useAuthentication();

  if (typeof authn.data === 'undefined') {
    return {};
  }

  if (authn.data.id === null) {
    return {};
  }

  return {
    identity: authn.data,
    identityUid: authn.data.id.toString(),
  };
}

function FullstoryFeature({ children }: PropsWithChildren): ReactNode {
  const state: State = useFullstory();

  return (
    <Fullstory
      devMode={process.env.NODE_ENV !== 'production'}
      orgId="o-1X4ZHB-na1"
      startCaptureManually={false}
      {...state}
    >
      {children}
    </Fullstory>
  );
}

export default memo(FullstoryFeature);
