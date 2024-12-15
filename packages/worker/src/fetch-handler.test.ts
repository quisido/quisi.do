import { TEST_EXECUTION_CONTEXT } from 'cloudflare-test-utils';
import { StatusCode, type IncomingRequest } from 'cloudflare-utils';
import { assert, describe, expect, it, vi } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import throwy from '../test/throwy.js';
import { FetchHandler } from './index.js';

const TEST_ERROR_HANDLER = vi.fn();

describe('FetchHandler', (): void => {
  it('should handle errors by default', async (): Promise<void> => {
    const testError = new Error();
    const handler = new TestExportedHandler({
      onError: TEST_ERROR_HANDLER,

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super((): never => {
            throw testError;
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    const response: Response = await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(StatusCode.InternalServerError);
    expect(TEST_ERROR_HANDLER).toHaveBeenCalledWith(testError);
  });

  it('should support custom error handlers', async (): Promise<void> => {
    let caughtError: unknown = null;
    const testError = new Error();
    const testResponse = new Response();
    const handler = new TestExportedHandler({
      onError: TEST_ERROR_HANDLER,

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(
            (): never => {
              throw testError;
            },
            (err: unknown): Response => {
              caughtError = err;
              return testResponse;
            },
          );
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    const response: Response = await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(caughtError).toBe(testError);
    expect(response).toBe(testResponse);
  });

  it('should vend cookies', async (): Promise<void> => {
    let cookiesValue: unknown = null;
    let numCookie: unknown = null;
    let strCookie: unknown = null;
    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(function handle(this: FetchHandler): Response {
            cookiesValue = this.cookies;
            numCookie = this.getCookie('num');
            strCookie = this.getCookie('str');
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(
      new Request('https://localhost/', {
        headers: new Headers({
          cookie: 'num=123; str=str',
        }),
      }),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(numCookie).toBe('123');
    expect(strCookie).toBe('str');
    expect(cookiesValue).toEqual({
      num: '123',
      str: 'str',
    });
  });

  it('should vend empty cookies', async (): Promise<void> => {
    let cookiesValue: unknown = null;
    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(function handle(this: FetchHandler): Response {
            cookiesValue = this.cookies;
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

    expect(cookiesValue).toEqual({});
  });

  it('should vend execution context', async (): Promise<void> => {
    let executionContextValue: unknown = null;

    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(function handle(this: FetchHandler): Response {
            executionContextValue = this.executionContext;
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

    expect(executionContextValue).toBe(TEST_EXECUTION_CONTEXT);
  });

  it('should not vend execution context outside of fetch', (): void => {
    const handler = new FetchHandler(throwy);

    expect((): ExecutionContext => {
      return handler.executionContext;
    }).toThrow('The execution context may only be accessed during fetch.');
  });

  it('should vend search parameters', async (): Promise<void> => {
    let searchParam: unknown = null;

    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(function handle(this: FetchHandler): Response {
            searchParam = this.getRequestSearchParam('test');
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(
      new Request('https://localhost/?test=value'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(searchParam).toBe('value');
  });

  it('should vend the request text', async (): Promise<void> => {
    let value: unknown = null;

    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(async function handle(this: FetchHandler): Promise<Response> {
            value = await this.getRequestText();
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(
      new Request('https://localhost/', {
        body: 'test body',
        method: 'POST',
      }),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(value).toBe('test body');
  });

  it('should vend origin', async (): Promise<void> => {
    let originValue: unknown = null;

    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(function handle(this: FetchHandler): Response {
            originValue = this.origin;
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(
      new Request('https://localhost/', {
        headers: new Headers({
          origin: 'localhost',
        }),
      }),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(originValue).toBe('localhost');
  });

  it('should vend the request', async (): Promise<void> => {
    let requestValue: unknown = null;
    const testRequest: IncomingRequest = new Request('https://localhost/');

    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(function handle(this: FetchHandler): Response {
            requestValue = this.request;
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(testRequest, {}, TEST_EXECUTION_CONTEXT);

    expect(requestValue).toBe(testRequest);
  });

  it('should not vend the request outside of fetch', (): void => {
    const handler = new FetchHandler(throwy);

    expect((): Request => {
      return handler.request;
    }).toThrow('The request may only be accessed during fetch.');
  });

  it('should vend the request method', async (): Promise<void> => {
    let method: unknown = null;
    const testRequest: IncomingRequest = new Request('https://localhost/', {
      method: 'POST',
    });

    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(function handle(this: FetchHandler): Response {
            method = this.requestMethod;
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(testRequest, {}, TEST_EXECUTION_CONTEXT);

    expect(method).toBe('POST');
  });

  it('should vend the request pathname', async (): Promise<void> => {
    let pathname: unknown = null;
    const testRequest: IncomingRequest = new Request('https://localhost/test/');

    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(function handle(this: FetchHandler): Response {
            pathname = this.requestPathname;
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(testRequest, {}, TEST_EXECUTION_CONTEXT);

    expect(pathname).toBe('/test/');
  });
});
