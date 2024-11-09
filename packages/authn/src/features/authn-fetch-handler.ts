import { FetchHandler } from '@quisido/worker';
import type { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import { MILLISECONDS_PER_DAY } from '../constants/time.js';
import getPatreonOAuthClientId from '../routes/patreon/get-patreon-oauth-client-id.js';
import getPatreonOAuthClientSecret from '../routes/patreon/get-patreon-oauth-client-secret.js';
import getPatreonOAuthHost from '../routes/patreon/get-patreon-oauth-host.js';
import getPatreonOAuthRedirectUri from '../routes/patreon/get-patreon-oauth-redirect-uri.js';
import getAnalyticsId from './analytics/get-analytics-id.js';
import getAnalyticsSecret from './analytics/get-analytics-secret.js';
import getAccessControlAllowOrigin from './get-access-control-allow-origin.js';
import getAuthnIdCookie from './get-authn-id.js';
import getAuthnUserIdsNamespace from './get-authn-user-ids-namespace.js';
import getCookieDomain from './get-cookie-domain.js';
import getDataBucket from './get-data-bucket.js';
import getEnvironmentName from './get-environment-name.js';
import getHost from './get-host.js';
import getIp from './get-ip.js';
import getSessionIdCookie from './get-session-id-cookie.js';
import handleFetchRequest from './handle-fetch-request.js';
import getDatabase from './shared/get-database.js';
import TemporaryMap from './temporary-map.js';

export default class AuthnFetchHandler extends FetchHandler {
  static #AUTHN_USER_ID_MAP = new TemporaryMap<number>();

  public constructor() {
    // Consider: `onMetric(metric: Metric): void` here at the top level
    // That can be where metrics are pushed to AnalyticsEngine or
    // Logged, etc. Instead of doing the metric implementation every
    // `emit()`, trickle it up to the one defined event listener at the
    // `Handler` constructor.
    super(handleFetchRequest);
    // InvalidPrivateDatasetMetric: new Metric(MetricName.InvalidPrivateDataset, {}),
    // InvalidPublicDatasetMetricName: new Metric(MetricName.InvalidPublicDataset, {}),
    // InvalidTraceParentMetricName: new Metric(MetricName.InvalidTraceParent, {}),
    // // InvalidUsageDatasetMetricName: new Metric(MetricName.InvalidUsageDataset, {}),
    // MissingPrivateDatasetMetricName: new Metric(MetricName.MissingPrivateDataset, {}),
    // MissingPublicDatasetMetricName: new Metric(MetricName.MissingPublicDataset, {}),
    // MissingTraceParentMetricName: new Metric(MetricName.MissingTraceParent, {}),
    // // MissingUsageDatasetMetricName: new Metric(MetricName.MissingUsageDataset, {}),
    // OnFetchError: handleFetchError,
  }

  public get accessControlAllowOrigin(): string {
    return getAccessControlAllowOrigin.call(this);
  }

  public get analyticsId(): string {
    return getAnalyticsId.call(this);
  }

  public get analyticsSecret(): string {
    return getAnalyticsSecret.call(this);
  }

  public get authnIdCookie(): string | undefined {
    return getAuthnIdCookie.call(this);
  }

  public get authnUserIdsNamespace(): KVNamespace {
    return getAuthnUserIdsNamespace.call(this);
  }

  public get cookieDomain(): string {
    return getCookieDomain.call(this);
  }

  public get dataBucket(): R2Bucket | null {
    return getDataBucket.call(this);
  }

  public get database(): D1Database {
    return getDatabase.call(this);
  }

  public emitPrivateMetric = (
    name: MetricName,
    dimensions?: Record<string, number | string>,
  ): void => {
    this.emitMetric(name, {
      ...dimensions,
      [Symbol('Public')]: false,
    });
  };

  public emitPublicMetric = (
    name: MetricName,
    dimensions?: Record<string, number | string>,
  ): void => {
    this.emitMetric(name, {
      ...dimensions,
      [Symbol('Public')]: true,
    });
  };

  public get environmentName(): EnvironmentName {
    return getEnvironmentName.call(this);
  }

  public getAuthnUserIdFromMemory = (authnId: string): number | undefined => {
    return AuthnFetchHandler.#AUTHN_USER_ID_MAP.get(authnId, {
      now: this.now,
    });
  };

  public get host(): string {
    return getHost.call(this);
  }

  public get ip(): string {
    return getIp.call(this);
  }

  public get patreonOAuthClientId(): string {
    return getPatreonOAuthClientId.call(this);
  }

  public get patreonOAuthClientSecret(): string {
    return getPatreonOAuthClientSecret.call(this);
  }

  public get patreonOAuthHost(): string {
    return getPatreonOAuthHost.call(this);
  }

  public get patreonOAuthRedirectUri(): string {
    return getPatreonOAuthRedirectUri.call(this);
  }

  public async query(
    query: string,
    bindings: readonly (null | number | string)[],
  ): Promise<D1Response> {
    return await this.database
      .prepare(query)
      .bind(...bindings)
      .run();
  }

  public get sessionIdCookie(): string {
    return getSessionIdCookie.call(this);
  }

  public setAuthnUserIdInMemory = (authnId: string, userId: number): void => {
    AuthnFetchHandler.#AUTHN_USER_ID_MAP.set(
      authnId,
      userId,
      MILLISECONDS_PER_DAY,
      {
        now: this.now,
      },
    );
  };
}
