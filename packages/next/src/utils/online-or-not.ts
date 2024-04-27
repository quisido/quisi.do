import isRecord from './is-record.js';

export interface Options {
  readonly fetch: Window['fetch'];
  readonly id: string;
  readonly token: string;
}

export interface UptimeChecks {
  readonly errors: unknown[];
  readonly messages: unknown[];
  readonly result: UptimeChecksResult;
  readonly success: boolean;
}

export interface UptimeChecksResult {
  readonly id: string;
  readonly lastQueued: string;
  readonly name: string;
  readonly status: 'ONLINE';
  readonly url: string;
}

function findUptimeChecks(value: unknown): value is UptimeChecks {
  return (
    isRecord(value) &&
    Array.isArray(value['errors']) &&
    Array.isArray(value['messages']) &&
    isRecord(value['result']) &&
    typeof value['result']['id'] === 'string' &&
    typeof value['result']['lastQueued'] === 'string' &&
    typeof value['result']['name'] === 'string' &&
    // Technical debt: `status` should be a string literal, like 'ONLINE'.
    typeof value['result']['status'] === 'string' &&
    typeof value['result']['url'] === 'string'
  );
}

function validateUptimeChecks(value: unknown): UptimeChecks {
  if (!findUptimeChecks(value)) {
    throw new Error(
      `Expected uptime checks, but received: ${typeof value} ${JSON.stringify(
        value,
      )}`,
    );
  }

  return value;
}

export default class OnlineOrNot {
  private readonly _fetch: Window['fetch'];

  private readonly _headers: Headers;

  private readonly _id: string;

  public constructor({ fetch, id, token }: Readonly<Options>) {
    this._fetch = fetch;
    this._id = id;

    this._headers = new Headers({
      Authorization: `Bearer ${token}`,
    });
  }

  private get requestInit(): RequestInit {
    return {
      headers: this._headers,
      method: 'GET',
    };
  }

  private get url(): string {
    return `https://api.onlineornot.com/v1/checks/${this._id}`;
  }

  public check = async (): Promise<UptimeChecks> => {
    const response: Response = await this._fetch(this.url, this.requestInit);
    const json: unknown = await response.json();
    return validateUptimeChecks(json);
  };
}
