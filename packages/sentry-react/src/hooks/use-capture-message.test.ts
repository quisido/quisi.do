import { captureMessage } from '@sentry/react';
import { useCaptureMessage } from '../index.js';

describe('useCaptureMessage', (): void => {
  it('should return the Sentry `captureMessage` method', (): void => {
    expect(useCaptureMessage()).toBe(captureMessage);
  });
});
