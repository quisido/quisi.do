import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';

describe('handleOAuthPathname', (): void => {
  it('should support a missing state search parameter', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const { expectOAuthErrorResponse } = await fetch('/patreon/');

    // Assert
    expectOAuthErrorResponse(ErrorCode.MissingStateSearchParam);
    expectToHaveEmitPublicMetric(MetricName.MissingStateSearchParam);
  });

  it('should support an invalid JSON state search parameter', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetch,
    } = new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: '/' }).toString();
    const { expectOAuthErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectOAuthErrorResponse(ErrorCode.NonJsonStateSearchParam);
    expectToHaveEmitPublicMetric(MetricName.NonJsonStateSearchParam);
    expectToHaveEmitPrivateMetric(MetricName.NonJsonStateSearchParam, {
      value: '/',
    });
  });

  it('should support a non-object JSON state search parameter', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetch,
    } = new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: '1234' }).toString();
    const { expectOAuthErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectOAuthErrorResponse(ErrorCode.NonObjectState);

    expectToHaveEmitPrivateMetric(MetricName.NonObjectState, {
      value: '1234',
    });

    expectToHaveEmitPublicMetric(MetricName.NonObjectState, {
      type: 'number',
    });
  });

  it('should emit and respond when the session ID cookie is missing', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/',
      sessionId: 'test-session-id-state',
    });

    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetch,
    } = new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: testState }).toString();
    const { expectOAuthErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        cookie: 'ab=cd; ef=gh; ij=kl',
      }),
    });

    // Assert
    expectOAuthErrorResponse(ErrorCode.MissingSessionIdCookie);

    expectToHaveEmitPrivateMetric(MetricName.MissingSessionIdCookie, {
      value: JSON.stringify({
        ab: 'cd',
        ef: 'gh',
        ij: 'kl',
      }),
    });

    expectToHaveEmitPublicMetric(MetricName.MissingSessionIdCookie, {
      keys: 'ab, ef, ij',
    });
  });

  it('should emit and respond to CSRF', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/',
      sessionId: 'test-session-id-state',
    });

    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetch,
    } = new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: testState }).toString();
    const { expectOAuthErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        cookie: '__Secure-Session-ID=test-session-id-cookie',
      }),
    });

    // Assert
    expectOAuthErrorResponse(ErrorCode.CSRF);
    expectToHaveEmitPublicMetric(MetricName.CSRF);
    expectToHaveEmitPrivateMetric(MetricName.CSRF, {
      cookie: 'test-session-id-cookie',
      state: 'test-session-id-state',
    });
  });
});
