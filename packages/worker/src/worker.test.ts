import { describe, expect, it, vi } from 'vitest';
import { TEST_EXECUTION_CONTEXT } from './test/test-execution-context.js';
import TestWorker from './test/test-worker.js';

describe('Worker', (): void => {
  describe('#fetchContext', (): void => {
    it('should throw an error outside of a fetch context', (): void => {
      const { getRequest } = new TestWorker();
      expect((): void => {
        getRequest();
      }).toThrowError('Expected a worker fetch context to be provided.');
    });
  });

  describe('getCookie', (): void => {
    it('should return a cookie value', async (): Promise<void> => {
      const { fetch, getCookie } = new TestWorker({
        onFetchRequest(): Response {
          const value: string | undefined = getCookie('test-cookie');
          return new Response(JSON.stringify(value));
        },
      });

      const response: Response = await fetch(
        new Request('https://localhost/', {
          headers: new Headers({
            cookie: 'test-cookie=test cookie value',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.json()).toBe('test cookie value');
    });

    it('should return undefined for missing cookies', async (): Promise<void> => {
      const { fetch, getCookie } = new TestWorker({
        onFetchRequest(): Response {
          const value: string | undefined = getCookie('test-cookie');
          return new Response(typeof value);
        },
      });

      const response: Response = await fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.text()).toBe('undefined');
    });
  });

  describe('getEnv', (): void => {
    it('should return an environment variable', async (): Promise<void> => {
      const { fetch, getEnv } = new TestWorker({
        onFetchRequest(): Response {
          const env: unknown = getEnv('TEST');
          return new Response(JSON.stringify(env));
        },
      });

      const response: Response = await fetch(
        new Request('https://localhost/'),
        {
          TEST: 'test environment variable',
        },
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.json()).toBe('test environment variable');
    });
  });

  describe('getExecutionContext', (): void => {
    it('should return the execution context', async (): Promise<void> => {
      let ctx: ExecutionContext | null = null;
      const { fetch, getExecutionContext } = new TestWorker({
        onFetchRequest(): Response {
          ctx = getExecutionContext();
          return new Response();
        },
      });

      await fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(ctx).toBe(TEST_EXECUTION_CONTEXT);
    });
  });

  describe('getFetch', (): void => {
    it('should return fetch', async (): Promise<void> => {
      const TEST_FETCH = vi.fn();

      let fetch: Fetcher['fetch'] | null = null;
      const { fetch: handleFetch, getFetch } = new TestWorker({
        fetch: TEST_FETCH,
        onFetchRequest(): Response {
          fetch = getFetch();
          return new Response();
        },
      });

      await handleFetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(fetch).toBe(TEST_FETCH);
    });
  });

  describe('getRequestMethod', (): void => {
    it('should return the request method', async (): Promise<void> => {
      const { fetch, getRequestMethod } = new TestWorker({
        onFetchRequest(): Response {
          const method: string = getRequestMethod();
          return new Response(method);
        },
      });

      const response: Response = await fetch(
        new Request('https://localhost/', {
          method: 'POST',
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.text()).toBe('POST');
    });
  });

  describe('getRequestPathname', (): void => {
    it('should return the request pathname', async (): Promise<void> => {
      const { fetch, getRequestPathname } = new TestWorker({
        onFetchRequest(): Response {
          const pathname: string = getRequestPathname();
          return new Response(pathname);
        },
      });

      const response: Response = await fetch(
        new Request('https://localhost/test/pathname/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.text()).toBe('/test/pathname/');
    });
  });

  describe('getRequestSearchParam', (): void => {
    it('should return a request search parameter', async (): Promise<void> => {
      const { fetch, getRequestSearchParam } = new TestWorker({
        onFetchRequest(): Response {
          const value: string | null = getRequestSearchParam('test-key');
          return new Response(JSON.stringify(value));
        },
      });

      const response: Response = await fetch(
        new Request('https://localhost/?test-key=test%20value'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.json()).toBe('test value');
    });
  });

  describe('getRequestText', (): void => {
    it('should return the request text', async (): Promise<void> => {
      const { fetch, getRequestText } = new TestWorker({
        async onFetchRequest(): Promise<Response> {
          const text: string = await getRequestText();
          return new Response(text);
        },
      });

      const response: Response = await fetch(
        new Request('https://localhost/', {
          body: 'test request text',
          method: 'POST',
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.text()).toBe('test request text');
    });
  });
});
