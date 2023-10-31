/// <reference types="jest" />
import { captureException } from '@sentry/react';
import { useCaptureException } from '../index.js';

describe('useCaptureException', (): void => {
  it('should return the Sentry `captureException` method', (): void => {
    expect(useCaptureException()).toBe(captureException);
  });
});
