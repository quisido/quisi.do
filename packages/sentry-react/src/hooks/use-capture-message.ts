import { captureMessage } from '@sentry/react';
import type { CaptureContext, Severity } from '@sentry/types';

export default function useCaptureMessage(): (
  message: string,
  captureContext?: CaptureContext | Severity | undefined,
) => string {
  return captureMessage;
}
