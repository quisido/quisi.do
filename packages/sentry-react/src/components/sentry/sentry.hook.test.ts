const TEST_INIT = jest.fn();
const TEST_SET_USER = jest.fn();
jest.mock('@sentry/react', () => ({
  init: TEST_INIT,
  setUser: TEST_SET_USER,
}));

import { renderHook } from '@testing-library/react-hooks';
import type { User } from '@sentry/types';
import DEFAULT_USER from '../../constants/default-user';
import useSentry from './sentry.hook';

const ONCE = 1;
const TEST_BEFORE_BREADCRUMB = jest.fn();
const TEST_BEFORE_SEND = jest.fn();
const TEST_TRACES_SAMPLER = jest.fn();
const TEST_TRANSPORT = jest.fn();

describe('useSentry', (): void => {
  it('should call init', (): void => {
    renderHook(useSentry, {
      initialProps: {
        allowUrls: [],
        attachStacktrace: true,
        autoSessionTracking: true,
        beforeBreadcrumb: TEST_BEFORE_BREADCRUMB,
        beforeSend: TEST_BEFORE_SEND,
        debug: true,
        defaultIntegrations: false,
        denyUrls: [],
        dist: 'test-dist',
        dsn: 'test-dsn',
        enabled: true,
        environment: 'test-environment',
        ignoreErrors: [],
        initialScope: {},
        integrations: [],
        maxBreadcrumbs: 1,
        maxValueLength: 1,
        normalizeDepth: 1,
        release: 'test-release',
        sampleRate: 1,
        shutdownTimeout: 1,
        tracesSampleRate: 1,
        tracesSampler: TEST_TRACES_SAMPLER,
        transport: TEST_TRANSPORT,
        tunnel: 'test-tunnel',
      },
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      allowUrls: [],
      attachStacktrace: true,
      autoSessionTracking: true,
      beforeBreadcrumb: TEST_BEFORE_BREADCRUMB,
      beforeSend: TEST_BEFORE_SEND,
      debug: true,
      defaultIntegrations: false,
      denyUrls: [],
      dist: 'test-dist',
      dsn: 'test-dsn',
      enabled: true,
      environment: 'test-environment',
      ignoreErrors: [],
      initialScope: {},
      integrations: [],
      maxBreadcrumbs: 1,
      maxValueLength: 1,
      normalizeDepth: 1,
      release: 'test-release',
      sampleRate: 1,
      shutdownTimeout: 1,
      tracesSampleRate: 1,
      tracesSampler: TEST_TRACES_SAMPLER,
      transport: TEST_TRANSPORT,
      tunnel: 'test-tunnel',
    });
  });

  it('should support a default user', (): void => {
    renderHook(useSentry, {
      initialProps: {
        dsn: 'test-dsn',
      },
    });

    expect(TEST_SET_USER).toHaveBeenCalledTimes(ONCE);
    expect(TEST_SET_USER).toHaveBeenLastCalledWith(DEFAULT_USER);
  });

  it('should support an explicit user', (): void => {
    const TEST_USER: User = {
      ...DEFAULT_USER,
      id: 'test-id',
    };

    renderHook(useSentry, {
      initialProps: {
        dsn: 'test-dsn',
        user: TEST_USER,
      },
    });

    expect(TEST_SET_USER).toHaveBeenCalledTimes(ONCE);
    expect(TEST_SET_USER).toHaveBeenLastCalledWith(TEST_USER);
  });
});
