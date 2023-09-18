import type { Event } from '@sentry/react';
import { captureEvent } from '@sentry/react';

export default function useCaptureEvent(): (event: Readonly<Event>) => string {
  return captureEvent;
}
