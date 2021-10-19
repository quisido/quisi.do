import SentryFullStory from '@sentry/fullstory';
import type { Integration } from '@sentry/types';
import HISTORY from '../constants/history';
import mapHistoryToSentryBrowserTracingIntegration from '../map/map-history-to-sentry-browser-tracing-integration';

const SENTRY_INTEGRATIONS: readonly Integration[] = [
  mapHistoryToSentryBrowserTracingIntegration(HISTORY),
  new SentryFullStory('charles-stover'),
];

export default SENTRY_INTEGRATIONS;
