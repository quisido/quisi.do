import * as client from '@fullstory/browser';
import SentryFullStory from '@sentry/fullstory';
import { type Integration } from '@sentry/types';
import BROWSER_TRACING_INTEGRATION from './browser-tracing-integration';

// Sentry's SDK does not allow integrations to be `readonly`.

export default [
  BROWSER_TRACING_INTEGRATION,
  new SentryFullStory('charles-stover', {
    client,
  }),
] satisfies Integration[];
