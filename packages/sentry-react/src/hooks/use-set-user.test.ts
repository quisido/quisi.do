import { setUser } from '@sentry/react';
import { useSetUser } from '..';

describe('useSetUser', (): void => {
  it('should return the Sentry `setUser` method', (): void => {
    expect(useSetUser()).toBe(setUser);
  });
});
