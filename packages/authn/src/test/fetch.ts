import type ErrorCode from '../constants/error-code.js';
import handleFetch from '../features/handle-fetch.js';
import expectResponseToRedirectTo from './expect-response-to-redirect-to.js';

interface Options {
  readonly env?: unknown;
  readonly fetch?: Fetcher['fetch'] | undefined;
  readonly waitUntil?: (promise: Promise<unknown>) => void;
}

interface Result {
  readonly expectErrorCodeRedirect: (code: ErrorCode) => void;
  readonly expectResponseToRedirectTo: (to: string) => void;
}

export default async function fetch({
  env,
  fetch: fetchImpl = jest.fn(),
  waitUntil = jest.fn(),
}: Options): Promise<Result> {
  const response: Response = await handleFetch(
    fetchImpl,
    new Request('https://localhost/authn/'),
    env,
    {
      passThroughOnException: jest.fn(),
      waitUntil,
    },
  );

  return {
    expectErrorCodeRedirect(code: ErrorCode): void {
      expectResponseToRedirectTo(
        response,
        `https://localhost/#authn:error=${code}`,
      );
    },
    expectResponseToRedirectTo(to: string): void {
      expectResponseToRedirectTo(response, to);
    },
  };
}
