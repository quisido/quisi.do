import { TEST_EXECUTION_CONTEXT, TestD1Database } from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

describe('Handler', (): void => {
  it('should support D1 databases', async (): Promise<void> => {
    let invalidError: unknown = null;
    let validDatabase: D1Database | null = null;
    const testDatabase = new TestD1Database();

    function testFetchHandler(this: FetchHandler): Response {
      validDatabase = this.getD1Database('VALID');
      try {
        this.getD1Database('INVALID');
      } catch (err: unknown) {
        invalidError = err;
      }
      return new Response();
    }

    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(testFetchHandler);
        }
      },
    });

    assert('fetch' in handler);
    await handler.fetch(
      new Request('https://localhost/'),
      {
        INVALID: null,
        VALID: testDatabase,
      },
      TEST_EXECUTION_CONTEXT,
    );

    expect(validDatabase).toBe(testDatabase);
    expect(invalidError).not.toBeNull();
  });
});
