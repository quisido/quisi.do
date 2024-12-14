import { mapMetricDimensionsToDataPoint } from '@quisido/worker';
import { TestExportedHandler, TestResponse } from '@quisido/worker-test';
import {
  EXPECT_ANY_HEADERS,
  EXPECT_ANY_STRING,
  TestAnalyticsEngineDataset,
  TestD1Database,
  TestKVNamespace,
  TestR2Bucket,
} from 'cloudflare-test-utils';
import AuthnFetchHandler from '../authn-fetch-handler.js';
import {
  INSERT_INTO_EMAILS_QUERY,
  INSERT_INTO_USERS_QUERY,
  SELECT_USERID_FROM_OAUTH_QUERY,
} from '../constants/queries.js';
import handleError from '../handle-error.js';
import handleLog from '../handle-log.js';
import handleMetric from '../handle-metric.js';
import AuthnTestResponse from './authn-test-response.js';
import mapStringToIp from './map-string-to-ip.js';
import { PATREON_IDENTITY_URL } from './patreon-identity-url.js';
import { TEST_PATREON_URL } from './test-patreon-url.js';

interface Options {
  readonly authnUserIds?: Readonly<Partial<Record<string, string>>>;
  readonly lastUsersRowId?: number | undefined;
  readonly env?: Readonly<Record<string, unknown>> | undefined;
  readonly now?: (() => number) | undefined;
  readonly oAuthResults?: readonly unknown[] | undefined;
}

const DEFAULT_LAST_USERS_ROW_ID = 1;

export default class TestAuthnExportedHandler extends TestExportedHandler {
  #authnData: TestR2Bucket;
  #authnDb: TestD1Database;
  public override mockResponse = super.mockResponse.bind(this);

  public override expectNotToHaveWrittenDataPoint =
    super.expectNotToHaveWrittenDataPoint.bind(this);

  public override expectToHaveWrittenDataPoint =
    super.expectToHaveWrittenDataPoint.bind(this);

  public constructor({
    authnUserIds = {},
    env = {},
    lastUsersRowId = DEFAULT_LAST_USERS_ROW_ID,
    now,
    oAuthResults = [{ userId: 1 }],
  }: Options = {}) {
    const authnData = new TestR2Bucket();
    const authnDb = new TestD1Database({
      [INSERT_INTO_EMAILS_QUERY]: {},

      [INSERT_INTO_USERS_QUERY]: {
        lastRowId: lastUsersRowId,
      },

      [SELECT_USERID_FROM_OAUTH_QUERY]: {
        results: oAuthResults,
      },
    });

    super({
      FetchHandler: AuthnFetchHandler,
      now,
      onError: handleError,
      onLog: handleLog,
      onMetric: handleMetric,

      env: {
        AUTHN_DATA: authnData,
        AUTHN_DB: authnDb,
        AUTHN_USER_IDS: new TestKVNamespace(authnUserIds),
        HOST: 'host.test.quisi.do',
        PATREON_OAUTH_CLIENT_ID: 'test-client-id',
        PATREON_OAUTH_CLIENT_SECRET: 'test-client-secret',
        PATREON_OAUTH_HOST: 'https://host.test.patreon.com',
        PATREON_OAUTH_REDIRECT_URI: 'https://redirect.test.quisi.do/patreon/',
        PRIVATE_DATASET: new TestAnalyticsEngineDataset(),
        PUBLIC_DATASET: new TestAnalyticsEngineDataset(),
        ...env,
      },
    });

    this.#authnData = authnData;
    this.#authnDb = authnDb;
  }

  public expectNotToHaveEmitPublicMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectNotToHaveWrittenDataPoint('PUBLIC_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  public expectNotToHaveQueriedAuthnDb = (query: string): void => {
    this.#authnDb.expectNotToHaveQueried(query);
  };

  public expectToHaveEmitPrivateMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectToHaveWrittenDataPoint('PRIVATE_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  public expectToHaveEmitPublicMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectToHaveWrittenDataPoint('PUBLIC_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  public expectToHavePutAuthnData = (
    ...params: Parameters<R2Bucket['put']>
  ): void => {
    this.#authnData.expectToHavePut(...params);
  };

  public expectToHaveQueriedAuthnDb = (
    query: string,
    values: readonly (null | number | string)[],
  ): void => {
    this.#authnDb.expectToHaveQueried(query, values);
  };

  public override fetch = async (
    input: string,
    init?: RequestInit<IncomingRequestCfProperties>,
  ): Promise<AuthnTestResponse> => {
    const testResponse: TestResponse = await super.fetch(input, init);
    return new AuthnTestResponse(testResponse);
  };

  public fetchPatreon = async (ip: string): Promise<AuthnTestResponse> => {
    return await this.fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp(ip),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });
  };

  public mockPatreonIdentity = (
    response: Response = new Response(
      JSON.stringify({
        data: {
          attributes: {},
          id: 'test-id',
        },
      }),
    ),
  ): void => {
    this.mockResponse(
      PATREON_IDENTITY_URL,
      {
        headers: EXPECT_ANY_HEADERS,
        method: 'GET',
      },
      response,
    );
  };

  public mockPatreonToken = (
    response: Response = new Response(
      JSON.stringify({ access_token: 'test-access-token' }),
    ),
  ): void => {
    this.mockResponse(
      'https://host.test.patreon.com/api/oauth2/token',
      {
        body: EXPECT_ANY_STRING,
        headers: EXPECT_ANY_HEADERS,
        method: 'POST',
      },
      response,
    );
  };
}
