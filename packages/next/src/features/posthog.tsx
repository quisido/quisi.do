'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import {
  memo,
  useEffect,
  useLayoutEffect,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import {
  useAuthentication,
  type AuthenticationState,
} from '../contexts/authentication.js';
import validateString from '../utils/validate-string.js';

const API_HOST: string = validateString(import.meta.env.POSTHOG_HOST);
const TOKEN: string = validateString(import.meta.env.POSTHOG_KEY);

function PostHog({ children }: PropsWithChildren): ReactElement {
  // Contexts
  const authn: AuthenticationState = useAuthentication();

  // Effects
  useLayoutEffect((): VoidFunction => {
    posthog.init(TOKEN, {
      api_host: API_HOST,
      person_profiles: 'always',
    });

    posthog.startSessionRecording();

    return (): void => {
      posthog.stopSessionRecording();
      posthog.reset();
    };
  }, []);

  useEffect((): void => {
    if (typeof authn.data === 'undefined') {
      return;
    }

    if (authn.data.id === null) {
      return;
    }

    posthog.identify(authn.data.id.toString(), authn.data);
  }, [authn]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export default memo(PostHog);
