import type { IncomingRequest } from 'cloudflare-utils';
import { describe, expect, it } from 'vitest';
import { TEST_EXECUTION_CONTEXT } from '../test/test-execution-context.js';
import { FetchHandler } from './index.js';

describe('FetchHandler', (): void => {
  it('should vend cookies', async (): Promise<void> => {
    let cookiesValue: unknown = null;
    let numCookie: unknown = null;
    let strCookie: unknown = null;
    const handler = new FetchHandler(function handle(
      this: FetchHandler,
    ): Response {
      cookiesValue = this.cookies;
      numCookie = this.getCookie('num');
      strCookie = this.getCookie('str');
      return new Response();
    });

    await handler.run(
      { console, env: {}, fetch },
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

  it('should vend execution context', async (): Promise<void> => {
    let executionContextValue: unknown = null;
    const handler = new FetchHandler(function handle(
      this: FetchHandler,
    ): Response {
      executionContextValue = this.executionContext;
      return new Response();
    });

    expect((): ExecutionContext => {
      return handler.executionContext;
    }).toThrow('The execution context may only be accessed during fetch.');

    await handler.run(
      { console, env: {}, fetch },
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(executionContextValue).toBe(TEST_EXECUTION_CONTEXT);
  });

  it('should vend search parameters', async (): Promise<void> => {
    let searchParam: unknown = null;
    const handler = new FetchHandler(function handle(
      this: FetchHandler,
    ): Response {
      searchParam = this.getRequestSearchParam('test');
      return new Response();
    });

    await handler.run(
      { console, env: {}, fetch },
      new Request('https://localhost/?test=value'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(searchParam).toBe('value');
  });

  it('should vend origin', async (): Promise<void> => {
    let originValue: unknown = null;
    const handler = new FetchHandler(function handle(
      this: FetchHandler,
    ): Response {
      originValue = this.origin;
      return new Response();
    });

    await handler.run(
      { console, env: {}, fetch },
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
    const handler = new FetchHandler(function handle(
      this: FetchHandler,
    ): Response {
      requestValue = this.request;
      return new Response();
    });

    expect((): Request => {
      return handler.request;
    }).toThrow('The request may only be accessed during fetch.');

    await handler.run(
      { console, env: {}, fetch },
      testRequest,
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(requestValue).toBe(testRequest);
  });
});
