'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import {
  useLayoutEffect,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import validateString from '../utils/validate-string.js';

const API_HOST: string = validateString(process.env['POSTHOG_HOST']);
const TOKEN: string = validateString(process.env['POSTHOG_KEY']);

export default function PostHog({ children }: PropsWithChildren): ReactElement {
  useLayoutEffect((): void => {
    posthog.init(TOKEN, {
      api_host: API_HOST,
      person_profiles: 'always',
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
