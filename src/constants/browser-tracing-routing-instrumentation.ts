import { reactRouterV5Instrumentation } from '@sentry/react';
import history from '../constants/history';

export default reactRouterV5Instrumentation(history);
