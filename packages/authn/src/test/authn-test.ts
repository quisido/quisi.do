import { StatusCode } from 'cloudflare-utils';
import { expect } from 'vitest';
import AuthnFetchHandler from '../authn-fetch-handler.js';
import { SECONDS_PER_DAY } from '../constants/time.js';
import { EXPECT_ANY_NUMBER } from '../test/expect-any.js';
import AuthnTestD1Database from './authn-test-d1-database.js';
import createAuthnTestHeaders from './create-authn-test-headers.js';
import createIp from './create-ip.js';
import type FetchTest from './fetch-test.js';
import getAuthnTestEnv from './get-authn-test-env.js';
import TestD1Database from './test-d1-database.js';
import TestExportedHandler from './test-exported-handler.js';
import TestKVNamespace from './test-kv-namespace.js';
import TestR2Bucket from './test-r2-bucket.js';

interface FetchPatreonOptions {
  readonly code?: string | undefined;
  readonly cookies?: string | undefined;
  readonly ip?: string | undefined;
  readonly sessionIdState?: string | undefined;
}

interface FetchWhoAmIOptions {
  readonly cookies?: string | undefined;
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

export default class AuthnTest extends TestExportedHandler {
  #authnUserIdsNamespace: unknown;
  #dataBucket: unknown;
  #database: TestD1Database;

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
    const getOption = <K extends keyof typeof options>(
      key: K,
      defaultValue: Options[K],
    ): Options[K] => {
      if (key in options) {
        return options[key];
      }

      return defaultValue;
    };

    const authnUserIdsNamespace: unknown = getOption(
      'authnUserIdsNamespace',
      new TestKVNamespace(authnUserIds),
    );

    const database = new AuthnTestD1Database({
      insertIntoEmailsError,
      insertIntoOAuthError,
      oAuthRowId,
      oAuthUserIdResults,
      usersRowId,
    });

    const patreonOAuthHost: unknown = getOption(
      'patreonOAuthHost',
      'https://patreon.test.quisi.do',
    );

    super({
      FetchHandler: AuthnFetchHandler,

      env: {
        ...getAuthnTestEnv(options),
        AUTHN_DATA: dataBucket,
        AUTHN_DB: getOption('database', database),
        AUTHN_USER_IDS: authnUserIdsNamespace,
        PATREON_OAUTH_HOST: patreonOAuthHost,
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
      throw new Error(
        'Expected authn user IDs namespace to be a Test KV Namespace.',
      );
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

    const headers: Headers = createAuthnTestHeaders({
      cookies,
      ip,
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

    return this.fetch(
      `https://localhost/patreon/?${urlSearchParams.toString()}`,
      {
        headers,
      },
    );
  };

  public fetchWhoAmI = ({
    cookies,
    method = 'GET',
    origin,
    ...options
  }: FetchWhoAmIOptions = {}): Promise<FetchTest> => {
    const getOption = <K extends keyof typeof options>(
      key: K,
      defaultValue: FetchWhoAmIOptions[K],
    ): FetchWhoAmIOptions[K] => {
      if (key in options) {
        return options[key];
      }

      return defaultValue;
    };

    const ip: string | undefined = getOption('ip', createIp());
    const headers: Headers = createAuthnTestHeaders({
      cookies,
      ip,
      origin,
    });

    return this.fetch('https://localhost/whoami/', {
      headers,
      method,
    });
  };

  #mockPatreonIdentity(
    host: unknown,
    body?: BodyInit | null,
    init?: ResponseInit,
  ): void {
    if (typeof host !== 'string') {
      return;
    }

    this.onFetch(`${host}/api/oauth2/v2/identity`, new Response(body, init));
  }

  #mockPatreonToken(
    host: unknown,
    body?: BodyInit | null,
    init?: ResponseInit,
  ): void {
    if (typeof host !== 'string') {
      return;
    }

    this.onFetch(`${host}/api/oauth2/token`, new Response(body, init));
  }
}
