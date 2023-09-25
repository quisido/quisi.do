import { captureEvent } from '@sentry/react';

export default function useCaptureEvent(): typeof captureEvent {
  return captureEvent;
}
