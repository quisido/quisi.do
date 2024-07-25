import type { StatusCode } from 'cloudflare-utils';
import { reduceEntriesToRecord } from 'fmrs';
import { expect } from 'vitest';

export default class FetchTest {
  #response: Response;

  public constructor(response: Response) {
    this.#response = response;
  }

  public expectResponseStatusToBe = (status: StatusCode): void => {
    expect(this.#response.status).toBe(status);
  };

  public expectResponseHeadersToBe = (
    headers: Partial<Record<string, string>>,
  ): void => {
    expect(this.#headersRecord).toEqual(headers);
  };

  public expectResponseJsonToBe = async (value: unknown): Promise<void> => {
    expect(await this.#response.json()).toEqual(value);
  };

  get #headers(): Headers {
    const { headers } = this.#response;
    return headers;
  }

  get #headersRecord(): Partial<Record<string, string>> {
    return [...this.#headers.entries()].reduce(reduceEntriesToRecord, {});
  }
}
