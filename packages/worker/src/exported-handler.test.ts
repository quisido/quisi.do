import { StatusCode, type IncomingRequest } from 'cloudflare-utils';
import { assert, describe, expect, it, vi } from 'vitest';
import { TEST_CONSOLE, TEST_CONSOLE_ERROR } from '../test/test-console.js';
import {
  TEST_EXECUTION_CONTEXT,
  TEST_WAIT_UNTIL,
} from '../test/test-execution-context.js';
import { ExportedHandler, FetchHandler } from './index.js';

const TEST_ENV: unknown = {};
const TEST_ERROR_HANDLER = vi.fn();
const TEST_LOG_HANDLER = vi.fn();
const TEST_METRIC_HANDLER = vi.fn();
const TEST_REQUEST: IncomingRequest = new Request('https://localhost/');

describe('ExportedHandler', (): void => {
  it('should construct with no event handlers', (): void => {
    const exportedHandler = new ExportedHandler({
      console: TEST_CONSOLE,
      fetch: vi.fn(),
    });

    expect(exportedHandler.fetch).toBeTypeOf('undefined');
    expect(exportedHandler.email).toBeTypeOf('undefined');
    expect(exportedHandler.queue).toBeTypeOf('undefined');
    expect(exportedHandler.scheduled).toBeTypeOf('undefined');
    expect(exportedHandler.tail).toBeTypeOf('undefined');
    expect(exportedHandler.test).toBeTypeOf('undefined');
    expect(exportedHandler.trace).toBeTypeOf('undefined');
  });

  describe('fetch', (): void => {
    it('should execute the fetch handler', async (): Promise<void> => {
      const testFetchHandler = vi.fn();
      const exportedHandler = new ExportedHandler({
        console: TEST_CONSOLE,
        fetch: vi.fn(),

        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
      });

      assert('fetch' in exportedHandler);
      await exportedHandler.fetch(
        TEST_REQUEST,
        TEST_ENV,
        TEST_EXECUTION_CONTEXT,
      );

      expect(testFetchHandler).toHaveBeenCalledOnce();
      expect(testFetchHandler).toHaveBeenLastCalledWith(
        TEST_REQUEST,
        TEST_ENV,
        TEST_EXECUTION_CONTEXT,
      );
    });

    it('should support event listeners', async (): Promise<void> => {
      const testError = new Error();
      const testPromise: Promise<unknown> = Promise.resolve();

      function testFetchHandler(this: FetchHandler): Response {
        this.affect(testPromise);
        this.emitMetric('test-metric', {});
        this.log('test message');
        this.logError(testError);
        return new Response();
      }

      const exportedHandler = new ExportedHandler({
        console: TEST_CONSOLE,
        fetch: vi.fn(),
        onError: TEST_ERROR_HANDLER,
        onLog: TEST_LOG_HANDLER,
        onMetric: TEST_METRIC_HANDLER,

        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
      });

      assert('fetch' in exportedHandler);
      await exportedHandler.fetch(
        TEST_REQUEST,
        TEST_ENV,
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_ERROR_HANDLER).toHaveBeenCalledOnce();
      expect(TEST_ERROR_HANDLER).toHaveBeenLastCalledWith(testError);
      expect(TEST_LOG_HANDLER).toHaveBeenCalledOnce();
      expect(TEST_LOG_HANDLER).toHaveBeenLastCalledWith('test message');
      expect(TEST_METRIC_HANDLER).toHaveBeenCalledOnce();
      expect(TEST_METRIC_HANDLER).toHaveBeenLastCalledWith('test-metric', {});
      expect(TEST_WAIT_UNTIL).toHaveBeenCalledOnce();
      expect(TEST_WAIT_UNTIL).toHaveBeenLastCalledWith(testPromise);
    });

    it('should handle synchronous errors', async (): Promise<void> => {
      const testError = new Error();
      const exportedHandler = new ExportedHandler({
        console: TEST_CONSOLE,
        fetch: vi.fn(),
        onError: TEST_ERROR_HANDLER,
        onLog: TEST_LOG_HANDLER,
        onMetric: TEST_METRIC_HANDLER,

        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(
              (): never => {
                throw testError;
              },
              (): never => {
                throw testError;
              },
            );
          }
        },
      });

      assert('fetch' in exportedHandler);
      const response: Response = await exportedHandler.fetch(
        TEST_REQUEST,
        TEST_ENV,
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_CONSOLE_ERROR).toHaveBeenCalledOnce();
      expect(TEST_CONSOLE_ERROR).toHaveBeenLastCalledWith(testError);
      expect(response.status).toBe(StatusCode.InternalServerError);
    });

    it('should handle asynchronous errors', async (): Promise<void> => {
      const testError = new Error();
      const exportedHandler = new ExportedHandler({
        console: TEST_CONSOLE,
        fetch: vi.fn(),
        onError: TEST_ERROR_HANDLER,
        onLog: TEST_LOG_HANDLER,
        onMetric: TEST_METRIC_HANDLER,

        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(
              (): Promise<never> => Promise.reject(testError),
              (): never => {
                throw testError;
              },
            );
          }
        },
      });

      assert('fetch' in exportedHandler);
      const response: Response = await exportedHandler.fetch(
        TEST_REQUEST,
        TEST_ENV,
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_CONSOLE_ERROR).toHaveBeenCalledOnce();
      expect(TEST_CONSOLE_ERROR).toHaveBeenLastCalledWith(testError);
      expect(response.status).toBe(StatusCode.InternalServerError);
    });
  });
});
