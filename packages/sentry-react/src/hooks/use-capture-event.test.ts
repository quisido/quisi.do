import { captureEvent } from '@sentry/react';
import { useCaptureEvent } from '..';

describe('useCaptureEvent', (): void => {
  it('should return the Sentry `captureEvent` method', (): void => {
    expect(useCaptureEvent()).toBe(captureEvent);
  });
});
