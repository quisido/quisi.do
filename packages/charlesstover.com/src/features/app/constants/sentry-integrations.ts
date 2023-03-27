import * as client from '@fullstory/browser';
import SentryFullStory from '@sentry/fullstory';
import type { Integration } from '@sentry/types';
import BROWSER_TRACING_INTEGRATION from '../constants/browser-tracing-integration';

// Sentry's SDK does not allow integrations to be `readonly`.
const SENTRY_INTEGRATIONS: Integration[] = [
  BROWSER_TRACING_INTEGRATION,
  new SentryFullStory('charles-stover', {
    client,
  }),
];

export default SENTRY_INTEGRATIONS;
