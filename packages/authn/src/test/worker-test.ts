import type { CreateExportedHandlerOptions } from '@quisido/worker';
import { assert, expect, vi, type Mock } from 'vitest';
import expectPrivateLog from './expect-private-log.js';
import expectPrivateMetric from './expect-private-metric.js';
import expectPublicMetric from './expect-public-metric.js';
import FetchTest from './fetch-test.js';
import mapHeadersInitToRecord from './map-headers-init-to-record.js';
import mapRequestInitToTestHeaders from './map-request-init-to-test-headers.js';
import { TEST_CONSOLE } from './test-console.js';

interface Options {
  readonly env?: Partial<Record<string, unknown>>;
  readonly getNow?: (() => number) | undefined;

  readonly createExportedHandler: (
    options: CreateExportedHandlerOptions,
  ) => ExportedHandler;
}

const DEFAULT_ENV: Partial<Record<string, unknown>> = {};
const FIRST = 0;

export default class WorkerTest {
  readonly #effects: Promise<unknown>[] = [];
  readonly #env: Record<string, unknown>;
  public expectPrivateLog = expectPrivateLog;
  public expectPrivateMetric = expectPrivateMetric;
  public expectPublicMetric = expectPublicMetric;
  readonly #exportedHandler: ExportedHandler;
  readonly #fetchHandlers = new Map<string, Response>();
  readonly #passThroughOnException: () => void = vi.fn();

  public constructor({
    createExportedHandler,
    env = DEFAULT_ENV,
    getNow,
  }: Options) {
    this.#env = env;
    this.#exportedHandler = createExportedHandler({
      console: TEST_CONSOLE,
      fetch: this.#fetch,
      getNow,
    });
  }

  public get env(): Record<string, unknown> {
    return this.#env;
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

    const effects: Promise<unknown>[] = this.#effects.splice(FIRST);
    await Promise.all(effects);

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

  get #waitUntil(): Mock<[Promise<unknown>], void> {
    return vi.fn((promise: Promise<unknown>): void => {
      this.#effects.push(promise);
    });
  }
}
