import { addBreadcrumb } from '@sentry/react';
import { useAddBreadcrumb } from '../index.js';

describe('useAddBreadcrumb', (): void => {
  it('should return the Sentry `addBreadcrumb` method', (): void => {
    expect(useAddBreadcrumb()).toBe(addBreadcrumb);
  });
});
