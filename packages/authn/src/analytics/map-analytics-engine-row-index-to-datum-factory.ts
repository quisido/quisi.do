import type { AnalyticsEngineRow } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { MILLISECONDS_PER_SECOND } from '../constants/time.js';
import { type Datum } from './datum.js';
import isMetricName from './is-metric-name.js';
import mapRowToDatum from './map-row-to-datum.js';

const mapRowToTimestamp = ({ timestamp }: AnalyticsEngineRow): number =>
  new Date(timestamp).getTime() / MILLISECONDS_PER_SECOND;

export default function mapAnalyticsEngineRowIndexToDatumFactory(
  this: AuthnFetchHandler,
  index: string,
): (row: AnalyticsEngineRow) => Datum {
  if (!isMetricName(index)) {
    this.emitPrivateMetric(MetricName.InvalidAnalyticsMetricName, {
      value: index,
    });
    return mapRowToDatum;
  }

  switch (index) {
    case MetricName.AuthenticationCreated:
    case MetricName.AuthnIdCreated:
    case MetricName.AuthnIdError:
    case MetricName.CSRF:
    case MetricName.EmailInsertError:
    case MetricName.EmailInserted:
    case MetricName.ErrorCode:
    case MetricName.ExpiredAuthnId:
    case MetricName.ForbiddenPatreonIdentityResponse:
    case MetricName.InvalidAnalyticsId:
    case MetricName.InvalidAnalyticsMetricName:
    case MetricName.InvalidAnalyticsResponse:
    case MetricName.InvalidAnalyticsRowBlobIndex:
    case MetricName.InvalidAnalyticsRowDoubleIndex:
    case MetricName.InvalidAnalyticsSecret:
    case MetricName.InvalidAuthnId:
    case MetricName.InvalidAuthnUserIdsNamespace:
    case MetricName.InvalidDatabase:
    case MetricName.InvalidEnvironmentVariable:
    case MetricName.InvalidOAuthUserId:
    case MetricName.InvalidPatreonAccessToken:
    case MetricName.InvalidPatreonClientId:
    case MetricName.InvalidPatreonGrantCode:
    case MetricName.InvalidPatreonIdentity:
    case MetricName.InvalidPatreonIdentityAttributes:
    case MetricName.InvalidPatreonIdentityData:
    case MetricName.InvalidInvalidPatreonTokenRequestDescription:
    case MetricName.InvalidPatreonTokenErrorResponse:
    case MetricName.InvalidPatreonTokenErrorResponseBody:
    case MetricName.InvalidPatreonTokenRequest:
    case MetricName.InvalidPatreonTokenResponse:
    case MetricName.InvalidPatreonIdentityId:
    case MetricName.InvalidPatreonIdentityResponse:
    case MetricName.InvalidPatreonOAuthClientId:
    case MetricName.InvalidPatreonOAuthClientSecret:
    case MetricName.InvalidPatreonOAuthHost:
    case MetricName.InvalidPatreonOAuthRedirectUri:
    case MetricName.InvalidPatreonOAuthToken:
    case MetricName.InvalidReturnPath:
    case MetricName.InvalidStateSessionId:
    case MetricName.InvalidTraceParent:
    case MetricName.InvalidUsageDataset:
    case MetricName.InvalidWorkerMetric:
    case MetricName.MissingAuthnUserIdsNamespace:
    case MetricName.MissingCookieDomain:
    case MetricName.MissingDataBucket:
    case MetricName.MissingDatabase:
    case MetricName.MissingEnvironmentName:
    case MetricName.MissingHost:
    case MetricName.MissingIP:
    case MetricName.MissingInvalidPatreonTokenRequestDescription:
    case MetricName.MissingIsolateEnvironment:
    case MetricName.MissingPatreonAccessToken:
    case MetricName.MissingPatreonIdentityAttributes:
    case MetricName.MissingPatreonIdentityData:
    case MetricName.MissingPatreonIdentityId:
    case MetricName.MissingPatreonOAuthClientId:
    case MetricName.MissingPatreonOAuthClientSecret:
    case MetricName.MissingPatreonOAuthHost:
    case MetricName.MissingPatreonRequestCode:
    case MetricName.MissingPatreonTokenErrorResponseBody:
    case MetricName.MissingPatreonTokenErrorResponseCode:
    case MetricName.MissingPrivateDataset:
    case MetricName.MissingPublicDataset:
    case MetricName.MissingReturnPath:
    case MetricName.MissingSessionIdCookie:
    case MetricName.MissingStateSearchParam:
    case MetricName.MissingStateSessionId:
    case MetricName.MissingUsageDataset:
    case MetricName.NonJsonStateSearchParam:
    case MetricName.NonObjectState:
    case MetricName.NotFound:
    case MetricName.OAuthInsertError:
    case MetricName.OAuthInserted:
    case MetricName.OAuthThrottled:
    case MetricName.OAuthUserIdSelected:
    case MetricName.SetAuthnUserId:
    case MetricName.UnknownError:
    case MetricName.UnknownPatreonIdentityError:
    case MetricName.UnknownPatreonTokenErrorResponseCode:
    case MetricName.WhoAmIThrottled:
      return mapRowToDatum;

    case MetricName.AuthenticationRead:
    case MetricName.CachedAuthnId:
    case MetricName.FaviconIco:
    case MetricName.MissingAuthnId:
    case MetricName.MissingTraceParent:
    case MetricName.PatreonRequest:
    case MetricName.RobotsTxt:
    case MetricName.RootPathname:
    case MetricName.UncachedAuthnId:
      return mapRowToTimestamp;
  }
}
