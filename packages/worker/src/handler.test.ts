import { assert, describe, expect, it, vi } from 'vitest';
import TestAnalyticsEngineDataset from '../test/analytics-engine-dataset.js';
import asyncSetTimeout from '../test/async-set-timeout.js';
import TestD1Database from '../test/d1-database.js';
import noop from '../test/noop.js';
import { TEST_EXECUTION_CONTEXT } from '../test/test-execution-context.js';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler, Handler, MetricName } from './index.js';

const IMMEDIATE = 1;
const TEST_LOG_HANDLER = vi.fn();
const TEST_METRIC_HANDLER = vi.fn();
const TEST_NOW = vi.fn();

describe('Handler', (): void => {
  it('should support a custom `now` method', async (): Promise<void> => {
    let nowValue = 0;
    const testNow = 1234;
    const handler = new TestExportedHandler({
      now: (): number => testNow,

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super((): Response => {
            nowValue = this.now();
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(nowValue).toBe(testNow);
  });

  it('should emit after flushing', async (): Promise<void> => {
    let promise: Promise<void> = Promise.resolve();
    const handler = new TestExportedHandler({
      onLog: TEST_LOG_HANDLER,

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super((): Response => {
            promise = asyncSetTimeout((): void => {
              this.log('test message');
            }, IMMEDIATE);
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(TEST_LOG_HANDLER).not.toHaveBeenCalled();
    await promise;
    expect(TEST_LOG_HANDLER).toHaveBeenCalledWith('test message');
  });

  it('should expose the console', (): void => {
    const handler = new Handler(noop);
    expect(handler.console).toBe(console);
  });

  describe('fetch', (): void => {
    it('should throw an error when fetching outside of an operation', async (): Promise<void> => {
      const handler = new Handler(noop);
      await expect(async (): Promise<void> => {
        await handler.fetch('');
      }).rejects.toThrow('You may only fetch during an operation.');
    });

    it('should emit a duration metric', async (): Promise<void> => {
      const testEndTime = 2345;
      const testStartTime = 1234;
      async function testFetchHandler(this: FetchHandler): Promise<Response> {
        await this.fetch('https://localhost/test/');
        return new Response();
      }

      TEST_NOW.mockReturnValue(testStartTime);
      const handler = new TestExportedHandler({
        now: TEST_NOW,
        onMetric: TEST_METRIC_HANDLER,

        fetch(): Promise<Response> {
          TEST_NOW.mockReturnValue(testEndTime);
          return Promise.resolve(new Response());
        },

        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
      });

      assert('fetch' in handler);
      await handler.fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_METRIC_HANDLER).toHaveBeenCalledWith(MetricName.Fetch, {
        endTime: testEndTime,
        startTime: testStartTime,
        url: 'https://localhost/test/',
      });
    });
  });

  it('should support fetching and parsing JSON', async (): Promise<void> => {
    const testObject: unknown = {
      number: 1234,
      string: 'test',
    };

    let response: unknown = null;
    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      response = await this.fetchJson('https://localhost/');
      return new Response();
    }

    const handler = new TestExportedHandler({
      fetch(): Promise<Response> {
        return Promise.resolve(new Response(JSON.stringify(testObject)));
      },

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(testFetchHandler);
        }
      },
    });

    assert('fetch' in handler);
    await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(response).toEqual(testObject);
  });

  it('should support fetching text', async (): Promise<void> => {
    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      return new Response(await this.fetchText('https://localhost/'));
    }

    const handler = new TestExportedHandler({
      fetch(): Promise<Response> {
        return Promise.resolve(new Response('Hello world'));
      },

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(testFetchHandler);
        }
      },
    });

    assert('fetch' in handler);
    const response: Response = await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(await response.text()).toEqual('Hello world');
  });

  it('should support analytics engine datasets', async (): Promise<void> => {
    let invalidError: unknown = null;
    let validDataset: AnalyticsEngineDataset | null = null;
    const testDataset = new TestAnalyticsEngineDataset(noop);

    function testFetchHandler(this: FetchHandler): Response {
      validDataset = this.getAnalyticsEngineDataset('VALID');
      try {
        this.getAnalyticsEngineDataset('INVALID');
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
        VALID: testDataset,
      },
      TEST_EXECUTION_CONTEXT,
    );

    expect(validDataset).toBe(testDataset);
    expect(invalidError).not.toBeNull();
  });

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
