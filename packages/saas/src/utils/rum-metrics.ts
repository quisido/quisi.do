import type RumMetricsError from '../types/rum-metrics-error.js';
import type RumMetricsType from '../types/rum-metrics.js';

interface Options {
  readonly accessKey: string;
  readonly fetch: (input: string, init: RequestInit) => Promise<Response>;
}

const isRumMetricsResponse = (
  value: unknown,
): value is RumMetricsError | RumMetricsType => value !== null;

const validateRumMetricsResponse = (
  value: unknown,
): RumMetricsError | RumMetricsType => {
  if (!isRumMetricsResponse(value)) {
    throw new Error('Expected rum metrics.');
  }
  return value;
};

export default class RumMetrics {
  readonly #accessKey: string;

  #cache: RumMetricsType | null = null;

  readonly #fetch: Window['fetch'];

  public constructor({ accessKey, fetch }: Readonly<Options>) {
    this.#accessKey = accessKey;
    this.#fetch = fetch;
  }

  private get url(): string {
    return `https://rum.cscdn.net/rum?accessKey=${this.#accessKey}`;
  }

  public handleRequest = async (): Promise<RumMetricsType> => {
    if (this.#cache !== null) {
      return this.#cache;
    }

    const response: Response = await this.#fetch(this.url);
    const json: unknown = await response.json();
    const data: RumMetricsError | RumMetricsType =
      validateRumMetricsResponse(json);

    if ('message' in data) {
      throw new Error(data.message);
    }

    this.#cache = data;
    return data;
  };
}
