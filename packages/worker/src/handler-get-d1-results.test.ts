import { TEST_EXECUTION_CONTEXT, TestD1Database } from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler, type HandlerD1Response } from './index.js';

const TEST_ERROR = new Error();
const TEST_LAST_ROW_ID = 1234;
const TEST_QUERY_ERROR = 'SELECT * FROM errors;';
const TEST_QUERY_SUCCESS = 'SELECT * FROM successes;';
const TEST_RESULTS: readonly unknown[] = [{}];

describe('Handler', (): void => {
  it('should support D1 results', async (): Promise<void> => {
    let errorResult: unknown = null;
    let successResults: HandlerD1Response | null = null;
    const testDatabase = new TestD1Database({
      [TEST_QUERY_ERROR]: {
        error: TEST_ERROR,
      },
      [TEST_QUERY_SUCCESS]: {
        lastRowId: TEST_LAST_ROW_ID,
        results: TEST_RESULTS,
      },
    });

    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      successResults = await this.getD1Results(
        'MY_DATABASE',
        TEST_QUERY_SUCCESS,
        [],
      );
      try {
        await this.getD1Results('MY_DATABASE', TEST_QUERY_ERROR, []);
      } catch (err: unknown) {
        errorResult = err;
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
        MY_DATABASE: testDatabase,
      },
      TEST_EXECUTION_CONTEXT,
    );

    expect(errorResult).toBe(TEST_ERROR);
    expect(successResults).toEqual({
      changedDb: true,
      changes: 1,
      duration: 1,
      lastRowId: TEST_LAST_ROW_ID,
      results: TEST_RESULTS,
      rowsRead: 1,
      rowsWritten: 1,
      sizeAfter: 1,
    });
  });
});
