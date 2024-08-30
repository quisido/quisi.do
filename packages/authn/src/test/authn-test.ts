import { StatusCode } from 'cloudflare-utils';
import { expect } from 'vitest';
import EnvironmentName from "../constants/environment-name.js";
import { INSERT_INTO_OAUTH_QUERY, INSERT_INTO_USERS_QUERY, SELECT_USERID_FROM_OAUTH_QUERY } from '../constants/queries.js';
import { SECONDS_PER_DAY } from '../constants/time.js';
import { createExportedHandler } from '../constants/worker.js';
import { EXPECT_ANY_NUMBER } from '../test/expect-any.js';
import TestAnalyticsEngineDataset from "./analytics-engine-dataset.js";
import TestD1Database from './d1-database.js';
import type FetchTest from "./fetch-test.js";
import TestKVNamespace from "./kv-namespace.js";
import TestR2Bucket from './r2-bucket.js';
import WorkerTest from "./worker-test.js";

interface FetchPatreonOptions {
  readonly ip?: string | undefined;
  readonly sessionIdCookie?: string | undefined;
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
  readonly environmentName?: unknown;
  readonly host?: unknown;
  readonly oAuthRowId?: number;
  readonly patreonIdentity?: string;
  readonly patreonIdentityStatusCode?: StatusCode;
  readonly patreonOAuthHost?: unknown;
  readonly patreonToken?: string | null;
  readonly patreonTokenStatusCode?: StatusCode;
  readonly userIds?: readonly number[];
  readonly usersRowId?: number;
}

const DEFAULT_AUTHN_USER_IDS: Partial<Record<string, string>> = {};
const DEFAULT_OPTIONS: Options = {};
const FIRST = 1;

const mapUserIdToResult = (userId: number): unknown => ({
  userId,
});

export default class AuthnTest extends WorkerTest {
  #authnUserIdsNamespace: unknown;
  #dataBucket: unknown;
  #database: TestD1Database;
  #now: number | undefined;

  public constructor({
    authnUserIds = DEFAULT_AUTHN_USER_IDS,
    dataBucket = new TestR2Bucket(),
    oAuthRowId = FIRST,
    patreonIdentity = '{"data":{"attributes":{},"id":"test-id"}}',
    patreonIdentityStatusCode = StatusCode.OK,
    patreonToken = '{"access_token":"test-access-token"}',
    patreonTokenStatusCode = StatusCode.OK,
    userIds = [],
    usersRowId = FIRST,
    ...options
  }: Options = DEFAULT_OPTIONS) {
    const database = new TestD1Database({
      [INSERT_INTO_OAUTH_QUERY]: {
        lastRowId: oAuthRowId,
      },
      [INSERT_INTO_USERS_QUERY]: {
        lastRowId: usersRowId,
      },
      [SELECT_USERID_FROM_OAUTH_QUERY]: {
        results: userIds.map(mapUserIdToResult),
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
      createExportedHandler,

      env: {
        AUTHN_DATA: dataBucket,
        AUTHN_DB: database,
        AUTHN_USER_IDS: authnUserIdsNamespace,
        COOKIE_DOMAIN: getOption('cookieDomain', 'localhost'),
        ENVIRONMENT_NAME: getOption('environmentName', EnvironmentName.Test),
        HOST: getOption('host', 'test.host'),
        PATREON_OAUTH_CLIENT_ID: 'test-client-id',
        PATREON_OAUTH_CLIENT_SECRET: 'test-client-secret',
        PATREON_OAUTH_HOST: patreonOAuthHost,
        PATREON_OAUTH_REDIRECT_URI: 'https://localhost/patreon/callback',
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
    ip = '127.0.0.1',
    sessionIdCookie = 'test-session-id',
    sessionIdState = 'test-session-id',
  }: FetchPatreonOptions = {}): Promise<FetchTest> => {
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

  public fetchWhoAmI = ({
    cookie,
    ip,
    method = 'GET',
    origin,
  }: FetchWhoAmIOptions = {}): Promise<FetchTest> => {
    const headers = new Headers();
    if (typeof cookie === 'string') {
      headers.set('cookie', cookie);
    }

    if (typeof ip === 'string') {
      headers.set('cf-connecting-ip', ip);
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
