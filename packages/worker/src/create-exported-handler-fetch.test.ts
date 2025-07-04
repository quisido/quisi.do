import {
  TEST_CONSOLE,
  TEST_CONSOLE_ERROR,
  TEST_EXECUTION_CONTEXT,
  TEST_WAIT_UNTIL,
} from 'cloudflare-test-utils';
import { StatusCode, type IncomingRequest } from 'cloudflare-utils';
import { assert, describe, expect, it, vi } from 'vitest';
import { ExportedHandler, FetchHandler } from './index.js';
import { EventEmitter } from 'eventemitter3';

const TEST_ENV: unknown = {};
const TEST_ERROR_HANDLER = vi.fn();
const TEST_FETCH = vi.fn();
const TEST_LOG_HANDLER = vi.fn();
const TEST_METRIC_HANDLER = vi.fn();
const TEST_REQUEST: IncomingRequest = new Request('https://localhost/');

const TEST_FETCH_EXECUTION_CONTEXT: ExecutionContext = {
  ...TEST_EXECUTION_CONTEXT,
  waitUntil: expect.any(Function) as () => void,
};

describe('createExportedHandlerFetch', (): void => {
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
    await exportedHandler.fetch(TEST_REQUEST, TEST_ENV, TEST_EXECUTION_CONTEXT);

    expect(testFetchHandler).toHaveBeenCalledOnce();
    expect(testFetchHandler).toHaveBeenLastCalledWith(
      TEST_REQUEST,
      TEST_ENV,
      TEST_FETCH_EXECUTION_CONTEXT,
    );
  });

  it('should support synchronous events', async (): Promise<void> => {
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
    await exportedHandler.fetch(TEST_REQUEST, TEST_ENV, TEST_EXECUTION_CONTEXT);

    expect(TEST_ERROR_HANDLER).toHaveBeenCalledOnce();
    expect(TEST_ERROR_HANDLER).toHaveBeenLastCalledWith(testError);
    expect(TEST_LOG_HANDLER).toHaveBeenCalledOnce();
    expect(TEST_LOG_HANDLER).toHaveBeenLastCalledWith('test message');
    expect(TEST_METRIC_HANDLER).toHaveBeenCalledOnce();
    expect(TEST_METRIC_HANDLER).toHaveBeenLastCalledWith('test-metric', {});
    expect(TEST_WAIT_UNTIL).toHaveBeenCalledOnce();
    expect(TEST_WAIT_UNTIL).toHaveBeenLastCalledWith(testPromise);
  });

  it('should support asynchronous events', async (): Promise<void> => {
    const testError = new Error();
    const testPromise: Promise<unknown> = Promise.resolve();

    function testFetchHandler(this: FetchHandler): Promise<Response> {
      this.affect(testPromise);
      this.emitMetric('test-metric', {});
      this.log('test message');
      this.logError(testError);
      return Promise.resolve(new Response());
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
    await exportedHandler.fetch(TEST_REQUEST, TEST_ENV, TEST_EXECUTION_CONTEXT);

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
    expect(TEST_CONSOLE_ERROR).toHaveBeenLastCalledWith(
      '[GET] https://localhost/',
      testError,
    );
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
    expect(TEST_CONSOLE_ERROR).toHaveBeenLastCalledWith(
      '[GET] https://localhost/',
      testError,
    );
    expect(response.status).toBe(StatusCode.InternalServerError);
  });

  it('should support a finally handler', async (): Promise<void> => {
    const eventEmitter = new EventEmitter();
    const testError = new Error('test message');
    const testFinally = vi.fn((): Promise<void> => {
      return Promise.reject(testError);
    });

    const exportedHandler = new ExportedHandler({
      console: TEST_CONSOLE,
      fetch: TEST_FETCH,
      finally: testFinally,
      onError: TEST_ERROR_HANDLER,
      onLog: TEST_LOG_HANDLER,
      onMetric: TEST_METRIC_HANDLER,

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(
            (
              _request: Request,
              _env: unknown,
              ctx: ExecutionContext,
            ): Response => {
              ctx.waitUntil(
                new Promise((_resolve, reject): void => {
                  eventEmitter.once('reject', reject);

                  // We also want to test when `waitUntil` calls `waitUntil`.
                  ctx.waitUntil(
                    new Promise((resolve): void => {
                      eventEmitter.once('resolve', resolve);
                    }),
                  );
                }),
              );
              return new Response();
            },
          );
        }
      },
    });

    assert('fetch' in exportedHandler);
    await exportedHandler.fetch(TEST_REQUEST, TEST_ENV, TEST_EXECUTION_CONTEXT);

    // Require successful promises in `waitUntil`.
    expect(testFinally).not.toHaveBeenCalled();
    eventEmitter.emit('resolve');

    // Require unsuccessful promises in `waitUntil`.
    expect(testFinally).not.toHaveBeenCalled();
    eventEmitter.emit('reject');

    // Await `Promise.allSettled`.
    await new Promise(setImmediate);

    expect(testFinally).toHaveBeenCalledOnce();
    expect(TEST_CONSOLE_ERROR).toHaveBeenLastCalledWith(
      '`finally` threw:',
      testError,
    );
  });

  it('should handle failed handler construction', async (): Promise<void> => {
    const testError = new Error('test message');
    const testFinally = vi.fn();

    const exportedHandler = new ExportedHandler({
      console: TEST_CONSOLE,
      fetch: TEST_FETCH,
      finally: testFinally,
      onError: TEST_ERROR_HANDLER,
      onLog: TEST_LOG_HANDLER,
      onMetric: TEST_METRIC_HANDLER,

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(
            // Note: As an IIFE, this will throw when constructed.
            ((): never => {
              throw testError;
            })(),
          );
        }
      },
    });

    assert('fetch' in exportedHandler);
    await exportedHandler.fetch(TEST_REQUEST, TEST_ENV, TEST_EXECUTION_CONTEXT);

    expect(testFinally).toHaveBeenCalledOnce();
    expect(TEST_CONSOLE_ERROR).toHaveBeenLastCalledWith(
      '[GET] https://localhost/',
      testError,
    );
  });
});
