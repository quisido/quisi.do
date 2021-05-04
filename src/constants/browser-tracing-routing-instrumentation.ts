import { reactRouterV5Instrumentation } from '@sentry/react';
import { RouterHistory } from '@sentry/react/dist/reactrouter';
import history from '../constants/history';

export default reactRouterV5Instrumentation(
  (history as unknown) as RouterHistory,
);
