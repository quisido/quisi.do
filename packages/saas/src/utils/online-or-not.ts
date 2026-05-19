import { hasKeys, isObject } from 'fmrs';

export interface Options {
  readonly fetch: Window['fetch'];
  readonly id: string;
  readonly token: string;
}

export interface UptimeChecksResult {
  readonly id: string;
  readonly lastQueued: string;
  readonly name: string;
  readonly status: 'ONLINE';
  readonly url: string;
}

export interface UptimeChecks {
  readonly errors: unknown[];
  readonly messages: unknown[];
  readonly result: UptimeChecksResult;
  readonly success: boolean;
}

const findUptimeChecks = (value: unknown): value is UptimeChecks =>
  isObject(value) &&
  hasKeys(value, ['errors', 'messages', 'result']) &&
  Array.isArray(value.errors) &&
  Array.isArray(value.messages) &&
  isObject(value.result) &&
  hasKeys(value.result, ['id', 'lastQueued', 'name', 'status', 'url']) &&
  typeof value.result.id === 'string' &&
  typeof value.result.lastQueued === 'string' &&
  typeof value.result.name === 'string' &&
  // Technical debt: `status` should be a string literal, like 'ONLINE'.
  typeof value.result.status === 'string' &&
  typeof value.result.url === 'string';

const validateUptimeChecks = (value: unknown): UptimeChecks => {
  if (!findUptimeChecks(value)) {
    throw new Error(
      `Expected uptime checks, but received: ${typeof value} ${JSON.stringify(
        value,
      )}`,
    );
  }

  return value;
};

export default class OnlineOrNot {
  readonly #fetch: Window['fetch'];

  readonly #headers: Headers;

  readonly #id: string;

  public constructor({ fetch, id, token }: Readonly<Options>) {
    this.#fetch = fetch;
    this.#id = id;

    this.#headers = new Headers({
      Authorization: `Bearer ${token}`,
    });
  }

  private get requestInit(): RequestInit {
    return {
      headers: this.#headers,
      method: 'GET',
    };
  }

  private get url(): string {
    return `https://api.onlineornot.com/v1/checks/${this.#id}`;
  }

  public check = async (): Promise<UptimeChecks> => {
    const response: Response = await this.#fetch(this.url, this.requestInit);
    const json: unknown = await response.json();
    return validateUptimeChecks(json);
  };
}
