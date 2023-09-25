import { captureException } from '@sentry/react';

export default function useCaptureException(): typeof captureException {
  return captureException;
}
