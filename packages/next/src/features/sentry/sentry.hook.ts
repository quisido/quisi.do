import { type Integration } from '@sentry/types';
import GITHUB_SHA from '../../constants/github-sha.js';
import useIntegrations from './hooks/use-integrations.js';

interface State {
  readonly environment: string;
  readonly integrations: Integration[];
  readonly release: string;
}

export default function useSentry(): State {
  return {
    environment: process.env.NODE_ENV,
    integrations: useIntegrations(),
    release: GITHUB_SHA ?? 'unknown',
  };
}
