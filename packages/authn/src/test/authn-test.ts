import EnvironmentName from "../constants/environment-name.js";
import TestAnalyticsEngineDataset from "./analytics-engine-dataset.js";
import type FetchTest from "./fetch-test.js";
import TestKVNamespace from "./kv-namespace.js";
import WorkerTest from "./worker-test.js";

interface FetchPatreonOptions {
  readonly ip?: string | undefined;
  readonly sessionIdCookie?: string | undefined;
  readonly sessionIdState?: string | undefined;
}

interface Options {
  readonly authnUserIds?: Partial<Record<string, string>>;
  readonly env?: Partial<Record<string, unknown>>;
}

const DEFAULT_AUTHN_USER_IDS: Partial<Record<string, string>> = {};
const DEFAULT_ENV: Partial<Record<string, unknown>> = {};
const DEFAULT_FETCH_PATREON_OPTIONS: FetchPatreonOptions = {};
const DEFAULT_OPTIONS: Options = {};

export default class AuthnTest extends WorkerTest {
  public constructor({
    authnUserIds = DEFAULT_AUTHN_USER_IDS,
    env = DEFAULT_ENV,
  }: Options = DEFAULT_OPTIONS) {
    super({
      env: {
        AUTHN_USER_IDS: new TestKVNamespace(authnUserIds),
        ENVIRONMENT_NAME: EnvironmentName.Test,
        HOST: 'test.host',
        PATREON_OAUTH_CLIENT_ID: 'test-client-id',
        PATREON_OAUTH_CLIENT_SECRET: 'test-client-secret',
        PATREON_OAUTH_HOST: 'https://test.patreon.com',
        PATREON_OAUTH_REDIRECT_URI: 'https://localhost/patreon/callback',
        PRIVATE_DATASET: new TestAnalyticsEngineDataset(),
        PUBLIC_DATASET: new TestAnalyticsEngineDataset(),
        ...env,
      },
    });

    this.mockPatreonIdentity();
    this.mockPatreonToken();
  }

  public fetchPatreon = async ({
    ip = '127.0.0.1',
    sessionIdCookie = 'test-session-id',
    sessionIdState = 'test-session-id',
  }: FetchPatreonOptions = DEFAULT_FETCH_PATREON_OPTIONS): Promise<FetchTest> => {
    const headers = new Headers({
      'cf-connecting-ip': ip,
    });

    const urlSearchParams: URLSearchParams = new URLSearchParams({
      code: '1234',
      state: JSON.stringify({
        returnPath: '/test-return-path/',
        sessionId: sessionIdState,
      }),
    });

    if (typeof sessionIdCookie === 'string') {
      headers.set('cookie', `__Secure-Session-ID=${sessionIdCookie}`);
    }

    return this.fetch(
      `https://localhost/patreon/?${urlSearchParams.toString()}`,
      {
        headers,
      },
    );
  };

  public mockPatreonIdentity = (body?: BodyInit | null, init?: ResponseInit): void => {
    const { PATREON_OAUTH_HOST } = this.env;
    if (typeof PATREON_OAUTH_HOST !== 'string') {
      return;
    }

    this.onFetch(
      `${PATREON_OAUTH_HOST}/api/oauth2/v2/identity`,
      new Response(body, init),
    );
  };

  public mockPatreonToken = (body?: BodyInit | null, init?: ResponseInit): void => {
    const { PATREON_OAUTH_HOST } = this.env;
    if (typeof PATREON_OAUTH_HOST !== 'string') {
      return;
    }

    this.onFetch(
      `${PATREON_OAUTH_HOST}/api/oauth2/token`,
      new Response(body, init),
    );
  }
}
