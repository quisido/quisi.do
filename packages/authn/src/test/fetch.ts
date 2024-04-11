import type ErrorCode from '../constants/error-code.js';
import handleFetch from '../features/handle-fetch.js';
import expectResponseToRedirectTo from './expect-response-to-redirect-to.js';

/**
 *   This test `fetch` function mimics the behavior of the Clouderflare worker's
 * exported fetch handler, with two important test-specific differences:
 * 1. You supply your own `fetch` implementation (e.g. `jest.fn()`).
 * 2. It returns an abstracted test API, analogous to a Page Object Model.
 */

interface Options {
  readonly env?: unknown;
  readonly fetch?: Fetcher['fetch'] | undefined;
  readonly headers?: Record<string, string> | undefined;
  readonly pathname?: string | undefined;
  readonly search?: Record<string, string> | undefined;
  readonly waitUntil?: (promise: Promise<unknown>) => void;
}

interface Result {
  readonly expectErrorCodeRedirect: (code: ErrorCode) => void;
  readonly expectPublicDataPoint: (datapoint: AnalyticsEngineDataPoint) => void;
  readonly expectResponseHeaderToBe: (key: string, value: string) => void;
  readonly expectResponseToRedirectTo: (to: string) => void;
  readonly expectPrivateDataPoint: (
    datapoint: AnalyticsEngineDataPoint,
  ) => void;
}

const TEST_SESSION_ID = '0123456789abcdef';
const TEST_WRITE_PRIVATE_DATAPOINT = jest.fn();
const TEST_WRITE_PUBLIC_DATAPOINT = jest.fn();

const DEFAULT_ENV: Record<string, unknown> = {
  HOST: 'localhost',
  PRIVATE_DATASET: {
    writeDataPoint: TEST_WRITE_PRIVATE_DATAPOINT,
  } satisfies AnalyticsEngineDataset,
  PUBLIC_DATASET: {
    writeDataPoint: TEST_WRITE_PUBLIC_DATAPOINT,
  } satisfies AnalyticsEngineDataset,
};

export default async function fetch({
  env,
  fetch: fetchImpl = jest.fn(),
  headers = {},
  pathname = '/authn/',
  search: searchOption = {},
  waitUntil = jest.fn(),
}: Options): Promise<Result> {
  const search: string = new URLSearchParams({
    ...searchOption,
    state: JSON.stringify({
      returnPath: '/',
      sessionId: TEST_SESSION_ID,
    }),
  }).toString();

  const response: Response = await handleFetch(
    fetchImpl,
    new Request(`https://localhost${pathname}?${search}`, {
      headers: new Headers({
        ...headers,
        Cookie: `__Secure-Session-ID=${TEST_SESSION_ID}`,
      }),
    }),
    typeof env === 'object' ? { ...DEFAULT_ENV, ...env } : env,
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

    expectPrivateDataPoint(datapoint: AnalyticsEngineDataPoint): void {
      expect(TEST_WRITE_PRIVATE_DATAPOINT).toHaveBeenCalledWith(datapoint);
    },

    expectPublicDataPoint(datapoint: AnalyticsEngineDataPoint): void {
      expect(TEST_WRITE_PUBLIC_DATAPOINT).toHaveBeenCalledWith(datapoint);
    },

    expectResponseHeaderToBe(key: string, value: string): void {
      expect(response.headers.get(key)).toBe(value);
    },

    expectResponseToRedirectTo(to: string): void {
      expectResponseToRedirectTo(response, to);
    },
  };
}
