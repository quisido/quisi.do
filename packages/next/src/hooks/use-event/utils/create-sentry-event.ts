import type { Event } from '@sentry/types';
import SENTRY_EVENT from '../constants/sentry-event';
import mapDimensionsToFingerprints from './map-dimensions-to-fingerprints';
import mapNumberToSentryEventId from './map-number-to-sentry-event-id';

interface Options {
  readonly dimensions: Record<string, unknown>;
  readonly hostname: string;
  readonly name: string;
  readonly pathname: string;
}

export default function createSentryEvent({
  dimensions,
  hostname,
  name,
  pathname,
}: Readonly<Options>): Event {
  const now: number = Date.now();

  return {
    ...SENTRY_EVENT,
    extra: dimensions,
    event_id: mapNumberToSentryEventId(now),
    fingerprint: [name, ...mapDimensionsToFingerprints(dimensions)],
    message: name,
    server_name: hostname,
    timestamp: now,
    transaction: pathname,
    contexts: {
      ...SENTRY_EVENT.contexts,
      device: {
        ...SENTRY_EVENT.contexts.device,
        name: window.navigator.userAgent,
      },
    },
  };
}
