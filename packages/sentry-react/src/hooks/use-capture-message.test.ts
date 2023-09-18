import { captureMessage } from '@sentry/react';
import { useCaptureMessage } from '..';

describe('useCaptureMessage', (): void => {
  it('should return the Sentry `captureMessage` method', (): void => {
    expect(useCaptureMessage()).toBe(captureMessage);
  });
});
