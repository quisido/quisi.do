import { describe, expect, it } from 'vitest';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe.skip('parsePatreonIdentity', (): void => {
  it('should write to data bucket', async (): Promise<void> => {
    // Assemble
    const { expectDataToHavePut, fetch } = new TestAuthnExportedHandler({
      patreonIdentity: '{"data":{"id":"test-id"}}',
    });

    // Act
    await fetch('/patreon/');

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
