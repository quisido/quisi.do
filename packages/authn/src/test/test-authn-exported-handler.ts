import { mapMetricDimensionsToDataPoint } from '@quisido/worker';
import {
  EXPECT_ANY_HEADERS,
  EXPECT_ANY_STRING,
  TestAnalyticsEngineDataset,
  TestD1Database,
  TestKVNamespace,
  TestR2Bucket,
} from 'cloudflare-test-utils';
import AuthnFetchHandler from '../authn-fetch-handler.js';
import { SELECT_USERID_FROM_OAUTH_QUERY } from '../constants/queries.js';
import handleError from '../handle-error.js';
import handleLog from '../handle-log.js';
import handleMetric from '../handle-metric.js';
import AuthnTestResponse from './authn-test-response.js';
import mapStringToIp from './map-string-to-ip.js';
import { PATREON_IDENTITY_URL } from './patreon-identity-url.js';
import TestExportedHandler from './test-exported-handler.js';
import { TEST_PATREON_URL } from './test-patreon-url.js';
import type TestResponse from './test-response.js';

interface Options {
  readonly authnUserIds?: Readonly<Partial<Record<string, string>>>;
  readonly env?: Readonly<Record<string, unknown>> | undefined;
  readonly now?: (() => number) | undefined;
}

export default class TestAuthnExportedHandler extends TestExportedHandler {
  #authnData: TestR2Bucket;
  public override expectAnalyticsEngineDatasetToWriteDataPoint =
    super.expectAnalyticsEngineDatasetToWriteDataPoint.bind(this);
  public override expectMetric = super.expectMetric.bind(this);
  public override mockResponse = super.mockResponse.bind(this);

  public constructor({ authnUserIds = {}, env = {}, now }: Options = {}) {
    const authnData = new TestR2Bucket();
    super({
      FetchHandler: AuthnFetchHandler,
      now,
      onError: handleError,
      onLog: handleLog,
      onMetric: handleMetric,

      env: {
        AUTHN_DATA: authnData,
        AUTHN_USER_IDS: new TestKVNamespace(authnUserIds),
        HOST: 'host.test.quisi.do',
        PATREON_OAUTH_CLIENT_ID: 'test-client-id',
        PATREON_OAUTH_CLIENT_SECRET: 'test-client-secret',
        PATREON_OAUTH_HOST: 'https://host.test.patreon.com',
        PATREON_OAUTH_REDIRECT_URI: 'https://redirect.test.quisi.do/patreon/',
        PRIVATE_DATASET: new TestAnalyticsEngineDataset(),
        PUBLIC_DATASET: new TestAnalyticsEngineDataset(),

        AUTHN_DB: new TestD1Database({
          [SELECT_USERID_FROM_OAUTH_QUERY]: {
            results: [{ userId: 1 }],
          },
        }),

        ...env,
      },
    });

    this.#authnData = authnData;
  }

  public expectToHaveEmitPrivateMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectAnalyticsEngineDatasetToWriteDataPoint('PRIVATE_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  public expectToHaveEmitPublicMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectAnalyticsEngineDatasetToWriteDataPoint('PUBLIC_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  public expectToHavePutAuthnData = (
    ...params: Parameters<R2Bucket['put']>
  ): void => {
    this.#authnData.expectToHavePut(...params);
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
