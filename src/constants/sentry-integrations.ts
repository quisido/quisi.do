import SentryFullStory from '@sentry/fullstory';
import type { Integration } from '@sentry/types';
import SENTRY_ORG from '../constants/sentry-org';
import HISTORY from '../constants/history';
import mapHistoryToSentryBrowserTracingIntegration from '../map/map-history-to-sentry-browser-tracing-integration';

const SENTRY_INTEGRATIONS: readonly Integration[] = [
  mapHistoryToSentryBrowserTracingIntegration(HISTORY),
  new SentryFullStory(SENTRY_ORG),
];

export default SENTRY_INTEGRATIONS;
