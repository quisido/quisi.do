import { captureException } from '@sentry/react';
import type { CaptureContext } from '@sentry/types';

export default function useCaptureException(): (
  exception: unknown,
  captureContext?: CaptureContext | undefined,
) => string {
  return captureException;
}
