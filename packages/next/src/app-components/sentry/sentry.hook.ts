import { type Integration } from '@sentry/types';
import GITHUB_SHA from '../../constants/github-sha';
import useIntegrations from './hooks/use-integrations';

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
