import type SentryIssue from '../types/sentry-issue.js';
import isSentryError from './is-sentry-error.js';
import validateSentryIssues from './validate-sentry-issues.js';

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
  readonly #authToken: string;

  readonly #fetch: (input: string, init: RequestInit) => Promise<Response>;

  readonly #organizationSlug: string;

  readonly #projectSlug: string;

  public constructor({
    authToken,
    fetch,
    organizationSlug,
    projectSlug,
  }: Readonly<Options>) {
    this.#authToken = authToken;
    this.#fetch = fetch;
    this.#organizationSlug = organizationSlug;
    this.#projectSlug = projectSlug;
  }

  private get requestInit(): RequestInit {
    return mapAuthTokenToRequestInit(this.#authToken);
  }

  private get url(): string {
    return `https://sentry.io/api/0/projects/${this.#organizationSlug}/${this.#projectSlug}/issues/`;
  }

  public readonly handleRequest = async (): Promise<readonly SentryIssue[]> => {
    const response: Response = await this.#fetch(this.url, this.requestInit);

    const json: unknown = await response.json();
    if (isSentryError(json)) {
      throw new Error(json.detail);
    }

    return validateSentryIssues(json);
  };
}
