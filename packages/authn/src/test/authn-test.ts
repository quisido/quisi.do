import { StatusCode } from 'cloudflare-utils';
import { expect } from 'vitest';
import EnvironmentName from "../constants/environment-name.js";
import { INSERT_INTO_EMAILS_QUERY, INSERT_INTO_OAUTH_QUERY, INSERT_INTO_USERS_QUERY, SELECT_USERID_FROM_OAUTH_QUERY } from '../constants/queries.js';
import { SECONDS_PER_DAY } from '../constants/time.js';
import { WORKER } from '../constants/worker.js';
import { EXPECT_ANY_NUMBER } from '../test/expect-any.js';
import TestAnalyticsEngineDataset from "./analytics-engine-dataset.js";
import createIp from './create-ip.js';
import TestD1Database from './d1-database.js';
import type FetchTest from "./fetch-test.js";
import TestKVNamespace from "./kv-namespace.js";
import TestR2Bucket from './r2-bucket.js';
import WorkerTest from "./worker-test.js";

interface FetchPatreonOptions {
  readonly code?: string | undefined;
  readonly cookies?: string | undefined;
  readonly ip?: string | undefined;
  readonly sessionIdState?: string | undefined;
}

interface FetchWhoAmIOptions {
  readonly cookie?: string | undefined;
  readonly ip?: string | undefined;
  readonly method?: string | undefined;
  readonly origin?: string | undefined;
}

interface Options {
  readonly authnUserIds?: Partial<Record<string, string>>;
  readonly authnUserIdsNamespace?: unknown;
  readonly cookieDomain?: unknown;
  readonly dataBucket?: unknown;
  readonly database?: unknown;
  readonly environmentName?: unknown;
  readonly host?: unknown;
  readonly insertIntoEmailsError?: Error;
  readonly insertIntoOAuthError?: Error;
  readonly oAuthRowId?: number;
  readonly oAuthUserIdResults?: readonly unknown[];
  readonly patreonIdentity?: string;
  readonly patreonIdentityStatusCode?: StatusCode;
  readonly patreonOAuthClientId?: unknown;
  readonly patreonOAuthClientSecret?: unknown;
  readonly patreonOAuthHost?: unknown;
  readonly patreonOAuthRedirectUri?: unknown;
  readonly patreonToken?: string | null;
  readonly patreonTokenStatusCode?: StatusCode;
  readonly usersRowId?: number;
}

const DEFAULT_AUTHN_USER_IDS: Partial<Record<string, string>> = {};
const DEFAULT_OPTIONS: Options = {};
const FIRST = 1;

export default class AuthnTest extends WorkerTest {
  #authnUserIdsNamespace: unknown;
  #dataBucket: unknown;
  #database: TestD1Database;
  #now: number | undefined;

  public constructor({
    authnUserIds = DEFAULT_AUTHN_USER_IDS,
    dataBucket = new TestR2Bucket(),
    insertIntoEmailsError,
    insertIntoOAuthError,
    oAuthRowId = FIRST,
    oAuthUserIdResults = [],
    patreonIdentity = '{"data":{"attributes":{},"id":"test-id"}}',
    patreonIdentityStatusCode = StatusCode.OK,
    patreonToken = '{"access_token":"test-access-token"}',
    patreonTokenStatusCode = StatusCode.OK,
    usersRowId = FIRST,
    ...options
  }: Options = DEFAULT_OPTIONS) {
    const database = new TestD1Database({
      [INSERT_INTO_EMAILS_QUERY]: {
        error: insertIntoEmailsError,
      },
      [INSERT_INTO_OAUTH_QUERY]: {
        error: insertIntoOAuthError,
        lastRowId: oAuthRowId,
      },
      [INSERT_INTO_USERS_QUERY]: {
        lastRowId: usersRowId,
      },
      [SELECT_USERID_FROM_OAUTH_QUERY]: {
        results: oAuthUserIdResults,
      },
    });

    /**
     *   For options that can be explicitly set to `undefined`, we must use
     * `key in options` rather than destructuring.
     */
    const getOption = <K extends keyof typeof options>(
      key: K,
      defaultValue: Options[K],
    ): Options[K] => {
      if (key in options) {
        return options[key];
      }

      return defaultValue;
    };

    const authnUserIdsNamespace: unknown = getOption('authnUserIdsNamespace', new TestKVNamespace(authnUserIds));
    const patreonOAuthHost: unknown = getOption('patreonOAuthHost', 'https://patreon.test.quisi.do');

    super({
      createExportedHandler: WORKER.createExportedHandler,

      env: {
        AUTHN_DATA: dataBucket,
        AUTHN_DB: getOption('database', database),
        AUTHN_USER_IDS: authnUserIdsNamespace,
        COOKIE_DOMAIN: getOption('cookieDomain', 'localhost'),
        ENVIRONMENT_NAME: getOption('environmentName', EnvironmentName.Test),
        HOST: getOption('host', 'test.host'),
        PATREON_OAUTH_CLIENT_ID: getOption('patreonOAuthClientId', 'test-client-id'),
        PATREON_OAUTH_CLIENT_SECRET: getOption('patreonOAuthClientSecret', 'test-client-secret'),
        PATREON_OAUTH_HOST: patreonOAuthHost,
        PATREON_OAUTH_REDIRECT_URI: getOption('patreonOAuthRedirectUri', 'https://localhost/patreon/callback'),
        PRIVATE_DATASET: new TestAnalyticsEngineDataset(),
        PUBLIC_DATASET: new TestAnalyticsEngineDataset(),
      },

      getNow: (): number => {
        return this.#now ?? Date.now();
      },
    });

    this.#authnUserIdsNamespace = authnUserIdsNamespace;
    this.#dataBucket = dataBucket;
    this.#database = database;
    this.#mockPatreonIdentity(patreonOAuthHost, patreonIdentity, {
      status: patreonIdentityStatusCode,
    });
    this.#mockPatreonToken(patreonOAuthHost, patreonToken, {
      status: patreonTokenStatusCode,
    });
  }

  public expectDataToHavePut = (
    ...params: Parameters<R2Bucket['put']>
  ): void => {
    if (!(this.#dataBucket instanceof TestR2Bucket)) {
      throw new Error('Expected authn data bucket to be a Test R2 Bucket.');
    }

    expect(this.#dataBucket.put).toHaveBeenCalledWith(...params);
  };

  public expectDatabaseToHaveQueried = (
    query: string,
    values: readonly (null | number | string)[],
  ): void => {
    this.#database.expectToHaveQueried(query, values);
  };

  public expectUserIdsToHavePut = (authnId: string, id: string): void => {
    if (!(this.#authnUserIdsNamespace instanceof TestKVNamespace)) {
      throw new Error('Expected authn user IDs namespace to be a Test KV Namespace.');
    }

    expect(this.#authnUserIdsNamespace.put).toHaveBeenCalledWith(authnId, id, {
      expiration: EXPECT_ANY_NUMBER,
      expirationTtl: SECONDS_PER_DAY,
    });
  };

  public fetchPatreon = async ({
    cookies = '__Secure-Session-ID=test-session-id',
    ip = createIp(),
    sessionIdState = 'test-session-id',
    ...options
  }: FetchPatreonOptions = {}): Promise<FetchTest> => {
    /**
     *   For options that can be explicitly set to `undefined`, we must use
     * `key in options` rather than destructuring.
     */
    const getOption = <K extends keyof typeof options>(
      key: K,
      defaultValue: FetchPatreonOptions[K],
    ): FetchPatreonOptions[K] => {
      if (key in options) {
        return options[key];
      }

      return defaultValue;
    };

    const headers = new Headers({
      'cf-connecting-ip': ip,
    });

    const urlSearchParams: URLSearchParams = new URLSearchParams({
      state: JSON.stringify({
        returnPath: '/test-return-path/',
        sessionId: sessionIdState,
      }),
    });

    const code: string | undefined = getOption('code', '1234');
    if (typeof code === 'string') {
      urlSearchParams.set('code', code);
    }

    if (typeof cookies === 'string') {
      headers.set('cookie', cookies);
    }

    return this.fetch(
      `https://localhost/patreon/?${urlSearchParams.toString()}`,
      {
        headers,
      },
    );
  };

  public fetchWhoAmI = ({
    cookie,
    ip = createIp(),
    method = 'GET',
    origin,
  }: FetchWhoAmIOptions = {}): Promise<FetchTest> => {
    const headers = new Headers({
      'cf-connecting-ip': ip,
    });

    if (typeof cookie === 'string') {
      headers.set('cookie', cookie);
    }

    if (typeof origin === 'string') {
      headers.set('origin', origin);
    }

    return this.fetch('https://localhost/whoami/', {
      headers,
      method,
    });
  };

  #mockPatreonIdentity(host: unknown, body?: BodyInit | null, init?: ResponseInit): void {
    if (typeof host !== 'string') {
      return;
    }

    this.onFetch(
      `${host}/api/oauth2/v2/identity`,
      new Response(body, init),
    );
  };

  #mockPatreonToken(host: unknown, body?: BodyInit | null, init?: ResponseInit): void {
    if (typeof host !== 'string') {
      return;
    }

    this.onFetch(
      `${host}/api/oauth2/token`,
      new Response(body, init),
    );
  };

  public setNow = (now: number): void => {
    this.#now = now;
  };
}
