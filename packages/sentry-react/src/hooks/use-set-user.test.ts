/// <reference types="jest" />
import { setUser } from '@sentry/react';
import { useSetUser } from '../index.js';

describe('useSetUser', (): void => {
  it('should return the Sentry `setUser` method', (): void => {
    expect(useSetUser()).toBe(setUser);
  });
});
