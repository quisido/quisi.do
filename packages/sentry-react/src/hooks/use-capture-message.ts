import { captureMessage } from '@sentry/react';

export default function useCaptureMessage(): typeof captureMessage {
  return captureMessage;
}
