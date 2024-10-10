import { describe, expect, it } from 'vitest';
import AuthnTest from '../../test/authn-test.js';

describe('parsePatreonIdentity', (): void => {
  it('should write to data bucket', async (): Promise<void> => {
    // Assemble
    const { expectDataToHavePut, fetchPatreon } = new AuthnTest({
      patreonIdentity: '{"data":{"id":"test-id"}}',
    });

    // Act
    await fetchPatreon();

    // Assert
    expectDataToHavePut(
      `provider-0/test-id.json`,
      '{"data":{"id":"test-id"}}',
      {
        customMetadata: {
          timestamp: expect.stringMatching(/^\d+$/u) as string,
        },
        httpMetadata: {
          contentType: 'application/json',
        },
      },
    );
  });
});
