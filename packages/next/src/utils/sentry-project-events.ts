import type SentryProjectEvent from '../types/sentry-project-event.js';
import isSentryError from './is-sentry-error.js';
import validateSentryProjectEvents from './validate-sentry-project-events.js';

interface Options {
  readonly authToken: string;
  readonly fetch: (input: string, init: RequestInit) => Promise<Response>;
  readonly organizationSlug: string;
  readonly projectSlug: string;
}

const mapAuthTokenToHeadersInit = (token: string): HeadersInit => ({
  Authorization: `Bearer ${token}`,
});

const mapAuthTokenToHeaders = (token: string): Headers => {
  const init: HeadersInit = mapAuthTokenToHeadersInit(token);
  return new Headers(init);
};

const mapAuthTokenToRequestInit = (token: string): RequestInit => ({
  headers: mapAuthTokenToHeaders(token),
});

export default class SentryProjectEvents {
  private readonly _authToken: string;

  private readonly _fetch: (
    input: string,
    init: RequestInit,
  ) => Promise<Response>;

  private readonly _organizationSlug: string;

  private readonly _projectSlug: string;

  public constructor({
    authToken,
    fetch,
    organizationSlug,
    projectSlug,
  }: Readonly<Options>) {
    this._authToken = authToken;
    this._fetch = fetch;
    this._organizationSlug = organizationSlug;
    this._projectSlug = projectSlug;
  }

  private get requestInit(): RequestInit {
    return mapAuthTokenToRequestInit(this._authToken);
  }

  private get url(): string {
    return `https://sentry.io/api/0/projects/${this._organizationSlug}/${this._projectSlug}/events/?full=true`;
  }

  public readonly handleRequest = async (): Promise<
    readonly SentryProjectEvent[]
  > => {
    const response: Response = await this._fetch(this.url, this.requestInit);

    const json: unknown = await response.json();
    if (isSentryError(json)) {
      throw new Error(json.detail);
    }

    return validateSentryProjectEvents(json);
  };
}
