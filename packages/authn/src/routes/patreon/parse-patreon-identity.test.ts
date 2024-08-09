import { describe, expect, it, vi, type Mock } from "vitest";
import AuthnTest from "../../test/authn-test.js";
import TestR2Bucket from "../../test/r2-bucket.js";

describe('parsePatreonIdentity', (): void => {
  it('should write to data bucket', async (): Promise<void> => {
    // Assemble
    const TEST_DATA_PUT: Mock<Parameters<R2Bucket['put']>, ReturnType<R2Bucket['put']>> = vi.fn();
    const { fetchPatreon, mockPatreonIdentity, mockPatreonToken } = new AuthnTest({
      env: {
        AUTHN_DATA: new TestR2Bucket({
          put: TEST_DATA_PUT,
        }),
      },
    });

    mockPatreonToken('{"access_token":"test-access-token"}');
    mockPatreonIdentity('{"data":{"id":"test-id"}}');

    // Act
    await fetchPatreon();

    // Assert
    expect(TEST_DATA_PUT).toHaveBeenCalledWith(
      `provider-0/test-id.json`,
      '{"data":{"id":"test-id"}}',
      {
        customMetadata: {
          timestamp: expect.stringMatching(/^\d+$/),
        },
        httpMetadata: {
          contentType: 'application/json',
        },
      },
    );
  });
});
