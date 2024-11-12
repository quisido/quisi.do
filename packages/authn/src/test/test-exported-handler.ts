import {
  ExportedHandler,
  type FetchHandler as IFetchHandler,
} from '@quisido/worker';
import { assert, vi } from 'vitest';
import { TEST_CONSOLE } from './test-console.js';

interface Options {
  readonly FetchHandler: new () => IFetchHandler;
  readonly env: Readonly<Record<string, unknown>>;
}

const TEST_FETCH = vi.fn();
const TEST_PASS_THROUGH_ON_EXCEPTION = vi.fn();
const TEST_WAIT_UNTIL = vi.fn();

export default class TestExportedHandler {
  readonly #env: Readonly<Record<string, unknown>>;
  readonly #exportedHandler: ExportedHandler;
  #now: () => number = Date.now.bind(Date);

  public constructor({ FetchHandler, env }: Options) {
    this.#env = env;
    this.#exportedHandler = new ExportedHandler({
      FetchHandler,
      console: TEST_CONSOLE,
      fetch: TEST_FETCH,
      now: this.getNow.bind(this),
    });
  }

  public fetch(
    input: RequestInfo<CfProperties>,
    init?: RequestInit<IncomingRequestCfProperties>,
  ): Promise<Response> | Response {
    const request = new Request<unknown, IncomingRequestCfProperties>(
      input,
      init,
    );

    const { fetch } = this.#exportedHandler;
    assert(typeof fetch !== 'undefined');
    return fetch(request, this.#env, {
      passThroughOnException: TEST_PASS_THROUGH_ON_EXCEPTION,
      waitUntil: TEST_WAIT_UNTIL,
    });
  }

  public getNow(): number {
    return this.#now();
  }

  public setNow(timestamp: number): void {
    this.#now = (): number => timestamp;
  }
}
