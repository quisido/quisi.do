import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleOAuthPathname', (): void => {
  it('should support a missing state search parameter', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new TestAuthnExportedHandler();

    // Act
    const { expectErrorResponse } = await fetch('/patreon/');

    // Assert
    expectErrorResponse(ErrorCode.MissingStateSearchParam);
    expectPublicMetric(MetricName.MissingStateSearchParam);
  });

  it('should support an invalid JSON state search parameter', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: '/' }).toString();
    const { expectErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectErrorResponse(ErrorCode.NonJsonStateSearchParam);
    expectPublicMetric(MetricName.NonJsonStateSearchParam);
    expectPrivateMetric(MetricName.NonJsonStateSearchParam, {
      value: '/',
    });
  });

  it('should support a non-object JSON state search parameter', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: '1234' }).toString();
    const { expectErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectErrorResponse(ErrorCode.NonObjectState);

    expectPrivateMetric(MetricName.NonObjectState, {
      value: '1234',
    });

    expectPublicMetric(MetricName.NonObjectState, {
      type: 'number',
    });
  });

  it('should identify CSRF', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/',
      sessionId: 'test-session-id-state',
    });

    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: testState }).toString();
    const { expectErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        cookie: '__Secure-Session-ID=test-session-id-cookie',
      }),
    });

    // Assert
    expectErrorResponse(ErrorCode.CSRF);
    expectPublicMetric(MetricName.CSRF);
    expectPrivateMetric(MetricName.CSRF, {
      cookie: 'test-session-id-cookie',
      state: 'test-session-id-state',
    });
  });
});
