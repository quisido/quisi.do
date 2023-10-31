import { captureEvent } from '@sentry/react';
import { useCaptureEvent } from '../index.js';

describe('useCaptureEvent', (): void => {
  it('should return the Sentry `captureEvent` method', (): void => {
    expect(useCaptureEvent()).toBe(captureEvent);
  });
});
