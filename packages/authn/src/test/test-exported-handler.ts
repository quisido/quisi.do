import {
  ExportedHandler,
  type FetchHandler as IFetchHandler,
} from '@quisido/worker';
import { assert, expect, vi } from 'vitest';
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

const TEST_FETCH = vi.fn();
const TEST_PASS_THROUGH_ON_EXCEPTION = vi.fn();
const TEST_WAIT_UNTIL = vi.fn();

export default class TestExportedHandler {
  readonly #consoleError: Console['error'] = vi.fn();
  readonly #consoleLog: Console['log'] = vi.fn();
  readonly #env: Readonly<Record<string, unknown>>;
  readonly #exportedHandler: ExportedHandler;
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
      fetch: TEST_FETCH,
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

    return await TestResponse.from(response);
  };

  public getNow(): number {
    return this.#now();
  }

  public setNow(timestamp: number): void {
    this.#now = (): number => timestamp;
  }
}
