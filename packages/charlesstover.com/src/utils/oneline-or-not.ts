interface Options {
  readonly fetch: Window['fetch'];
  readonly id: string;
  readonly token: string;
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
      'Content-Type': 'application/json',
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

  public handleUptimeRequest = async (): Promise<Response> => {
    return this._fetch(this.url, this.requestInit);
  };
}
