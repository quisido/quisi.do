/// <reference types="jest" />

/**
 *   Technical debt: Replace `jest.mock` with a context provider for mocked
 * implementations. We use `var` here because `jest.mock` is hoisted, so too
 * must be the variables used inside the mock implementation.
 */
const mockInit = jest.fn();
const mockSetUser = jest.fn();
jest.mock('@sentry/react', () => ({
  init: mockInit,
  setUser: mockSetUser,
}));

import { renderHook } from '@testing-library/react';
import type { User } from '@sentry/types';
import DEFAULT_USER from '../../constants/default-user.js';
import useSentry from './sentry.hook.js';

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

    expect(mockInit).toHaveBeenCalledTimes(ONCE);
    expect(mockInit).toHaveBeenLastCalledWith({
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

    expect(mockSetUser).toHaveBeenCalledTimes(ONCE);
    expect(mockSetUser).toHaveBeenLastCalledWith(DEFAULT_USER);
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

    expect(mockSetUser).toHaveBeenCalledTimes(ONCE);
    expect(mockSetUser).toHaveBeenLastCalledWith(TEST_USER);
  });
});
