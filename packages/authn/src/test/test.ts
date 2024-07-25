import { assert, expect, vi, type Mock } from 'vitest';
import EnvironmentName from '../constants/environment-name.js';
import { createExportedHandler } from '../constants/worker.js';
import TestAnalyticsEngineDataset from './analytics-engine-dataset.js';
import expectPrivateLog from './expect-private-log.js';
import expectPrivateMetric from './expect-private-metric.js';
import expectPublicMetric from './expect-public-metric.js';
import FetchTest from './fetch-test.js';
import TestKVNamespace from './kv-namespace.js';
import mapHeadersInitToRecord from './map-headers-init-to-record.js';
import mapRequestInitToTestHeaders from './map-request-init-to-test-headers.js';
import { TEST_CONSOLE } from './test-console.js';

interface Options {
  readonly authnUserIds?: Partial<Record<string, string>>;
  readonly env?: Partial<Record<string, unknown>>;
}

const DEFAULT_AUTHN_USER_IDS: Partial<Record<string, string>> = {};
const DEFAULT_ENV: Partial<Record<string, unknown>> = {};
const DEFAULT_OPTIONS: Options = {};

export default class Test {
  readonly #env: Record<string, unknown>;
  public expectPrivateLog = expectPrivateLog;
  public expectPrivateMetric = expectPrivateMetric;
  public expectPublicMetric = expectPublicMetric;
  readonly #exportedHandler: ExportedHandler;
  readonly #fetchHandlers = new Map<string, Response>();
  readonly #passThroughOnException: () => void = vi.fn();
  readonly #waitUntil: () => void = vi.fn();

  public constructor({
    authnUserIds = DEFAULT_AUTHN_USER_IDS,
    env = DEFAULT_ENV,
  }: Options = DEFAULT_OPTIONS) {
    this.#env = {
      AUTHN_USER_IDS: new TestKVNamespace(authnUserIds),
      ENVIRONMENT_NAME: EnvironmentName.Test,
      HOST: 'test.host',
      PATREON_OAUTH_CLIENT_ID: 'test-client-id',
      PATREON_OAUTH_CLIENT_SECRET: 'test-client-secret',
      PATREON_OAUTH_HOST: 'https://test.patreon.com',
      PATREON_OAUTH_REDIRECT_URI: 'https://localhost/patreon/callback',
      PRIVATE_DATASET: new TestAnalyticsEngineDataset(),
      PUBLIC_DATASET: new TestAnalyticsEngineDataset(),
      ...env,
    };

    this.#exportedHandler = createExportedHandler({
      console: TEST_CONSOLE,
      fetch: this.#fetch,
    });
  }

  get #executionContext(): ExecutionContext {
    return {
      passThroughOnException: this.#passThroughOnException,
      waitUntil: this.#waitUntil,
    };
  }

  public expectFetchToHaveBeenCalledWith = (
    ...args: Parameters<Fetcher['fetch']>
  ): void => {
    expect(this.#fetch).toHaveBeenCalledWith(...args);
  };

  public expectFetchToHaveBeenCalledWithHeaders = (
    record: Record<string, string>,
  ): void => {
    for (const call of this.#fetch.mock.calls) {
      const [, requestInit] = call;
      if (typeof requestInit === 'undefined') {
        continue;
      }
      const { headers } = requestInit;
      if (typeof headers === 'undefined') {
        continue;
      }

      try {
        const headersRecord: Record<string, string> =
          mapHeadersInitToRecord(headers);
        expect(headersRecord).toEqual(record);
        return;
      } catch (_err: unknown) {
        continue;
      }
    }
    throw new Error('Fetch was not called with the specified headers.');
  };

  public fetch = async <CfHostMetadata = unknown>(
    input: string,
    init: RequestInit<IncomingRequestCfProperties<CfHostMetadata>> = {},
  ): Promise<FetchTest> => {
    assert(typeof this.#exportedHandler.fetch !== 'undefined');

    const response: Response = await this.#exportedHandler.fetch(
      new Request(input, {
        ...init,
        headers: mapRequestInitToTestHeaders(init),
      }),
      this.#env,
      this.#executionContext,
    );

    return new FetchTest(response);
  };

  #handleFetch = (url: RequestInfo): Promise<Response> => {
    if (typeof url !== 'string') {
      throw new Error('Mocked fetch only supports string URLs.');
    }

    const { origin, pathname } = new URL(url);
    const response: Response | undefined = this.#fetchHandlers.get(
      `${origin}${pathname}`,
    );
    if (typeof response === 'undefined') {
      throw new Error(`Response for ${url} not mocked`);
    }

    return Promise.resolve(response);
  };

  readonly #fetch: Mock<
    Parameters<Fetcher['fetch']>,
    ReturnType<Fetcher['fetch']>
  > = vi.fn(this.#handleFetch);

  public onFetch = (url: string, response: Response): void => {
    this.#fetchHandlers.set(url, response);
  };
}
