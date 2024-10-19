import type { StatusCode } from 'cloudflare-utils';
import { parse } from 'cookie';
import { reduceEntriesToRecord } from 'fmrs';
import { expect } from 'vitest';

export default class FetchTest {
  #response: Response;

  public constructor(response: Response) {
    this.#response = response;
  }

  public get authnIdCookie(): string {
    const authnId: string | undefined =
      this.#cookies['__Secure-Authentication-ID'];

    if (typeof authnId === 'undefined') {
      throw new Error('Expected an authentication ID cookie.');
    }

    return authnId;
  }

  get #cookies(): Partial<Record<string, string>> {
    const cookies: string | undefined = this.#headersRecord['set-cookie'];
    if (typeof cookies === 'undefined') {
      throw new Error('Expected cookies to be set.');
    }

    return parse(cookies);
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
