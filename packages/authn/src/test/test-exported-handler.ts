import {
  ExportedHandler,
  type FetchHandler as IFetchHandler,
} from '@quisido/worker';
import { isNot } from 'fmrs';
import { assert, expect, vi } from 'vitest';
import isEqual from './is-equal.js';
import mapRequestInfoToString from './map-request-info-to-string.js';
import TestResponse from './test-response.js';

interface Options {
  readonly FetchHandler: new () => IFetchHandler;
  readonly env: Readonly<Record<string, unknown>>;
  readonly now?: (() => number) | undefined;
  readonly onError: (error: Error) => void;
  readonly onLog: (message: string) => void;

  readonly onMetric: (
    name: string,
    dimensions: Record<string, boolean | number | string>,
  ) => void;
}

const EMPTY = 0;
const TEST_PASS_THROUGH_ON_EXCEPTION = vi.fn();
const TEST_WAIT_UNTIL = vi.fn();

export default class TestExportedHandler {
  readonly #consoleError: Console['error'] = vi.fn();
  readonly #consoleLog: Console['log'] = vi.fn();
  readonly #env: Readonly<Record<string, unknown>>;
  readonly #exportedHandler: ExportedHandler;
  readonly #fetchErrors: Error[] = [];
  readonly #mockedResponses = new Map<string, readonly [unknown, Response][]>();
  #now: () => number = Date.now.bind(Date);

  public constructor({
    FetchHandler,
    env,
    now = this.getNow.bind(this),
    onError,
    onLog,
    onMetric,
  }: Options) {
    this.#env = env;
    this.#exportedHandler = new ExportedHandler({
      FetchHandler,
      fetch: this.#mockedFetch,
      now,
      onError,
      onLog,
      onMetric,

      console: {
        ...console,
        error: this.#consoleError,
        log: this.#consoleLog,
      },
    });
  }

  public expectAnalyticsEngineDatasetToWriteDataPoint = (
    dataset: string,
    dataPoint: AnalyticsEngineDataPoint,
  ): void => {
    assert(typeof this.#env[dataset] === 'object');
    assert(this.#env[dataset] !== null);
    assert('writeDataPoint' in this.#env[dataset]);
    expect(this.#env[dataset].writeDataPoint).toHaveBeenCalledWith(dataPoint);
  };

  public expectConsoleError = (...messages: readonly string[]): void => {
    expect(this.#consoleError).toHaveBeenCalledWith(...messages);
  };

  public expectConsoleLog = (...messages: readonly string[]): void => {
    expect(this.#consoleLog).toHaveBeenCalledWith(...messages);
  };

  public fetch = async (
    input: string,
    init?: RequestInit<IncomingRequestCfProperties>,
  ): Promise<TestResponse> => {
    const request = new Request<unknown, IncomingRequestCfProperties>(
      `https://localhost:1234${input}`,
      init,
    );

    const { fetch } = this.#exportedHandler;
    assert(typeof fetch !== 'undefined');

    const response: Response = await fetch(request, this.#env, {
      passThroughOnException: TEST_PASS_THROUGH_ON_EXCEPTION,
      waitUntil: TEST_WAIT_UNTIL,
    });

    const [firstFetchError] = this.#fetchErrors;
    if (typeof firstFetchError !== 'undefined') {
      throw firstFetchError;
    }

    const [firstMockedRequest] = this.#mockedResponses.keys();
    if (typeof firstMockedRequest !== 'undefined') {
      throw new Error(`Unused mocked request: ${firstMockedRequest}`);
    }

    return await TestResponse.from(response);
  };

  public getNow = (): number => {
    return this.#now();
  };

  #mockedFetch = vi.fn(
    (input: RequestInfo, init?: RequestInit): Promise<Response> => {
      const url: string = mapRequestInfoToString(input);
      const mockedResponses: readonly [unknown, Response][] | undefined =
        this.#mockedResponses.get(url);

      if (typeof mockedResponses === 'undefined') {
        this.#fetchErrors.push(new Error(`No responses are mocked for ${url}`));
        return Promise.resolve(new Response());
      }

      for (const mockedResponseEntry of mockedResponses) {
        const [mockedInit, mockedResponse] = mockedResponseEntry;
        if (!isEqual(init, mockedInit)) {
          continue;
        }

        const newMockedResponses: readonly [unknown, Response][] =
          mockedResponses.filter(isNot(mockedResponseEntry));
        if (newMockedResponses.length === EMPTY) {
          this.#mockedResponses.delete(url);
        } else {
          this.#mockedResponses.set(url, newMockedResponses);
        }

        return Promise.resolve(mockedResponse);
      }

      this.#fetchErrors.push(
        new Error(
          `No response is mocked for ${url} with init:
${JSON.stringify(init)}`,
        ),
      );

      return Promise.resolve(new Response());
    },
  );

  public mockResponse = (
    input: RequestInfo,
    init: RequestInit,
    response: Response,
  ): void => {
    const url: string = mapRequestInfoToString(input);
    const mockedResponses: readonly [unknown, Response][] | undefined =
      this.#mockedResponses.get(url);
    if (typeof mockedResponses === 'undefined') {
      this.#mockedResponses.set(url, [[init, response]]);
    } else {
      this.#mockedResponses.set(url, [...mockedResponses, [init, response]]);
    }
  };

  public setNow = (timestamp: number): void => {
    this.#now = (): number => timestamp;
  };
}
