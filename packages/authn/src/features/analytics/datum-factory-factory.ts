import type Worker from '@quisido/worker';
import type { AnalyticsEngineRow } from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import { MILLISECONDS_PER_SECOND } from '../../constants/time.js';
import { type Datum } from './datum.js';
import isMetricName from './is-metric-name.js';
import mapRowToDatum from './map-row-to-datum.js';

const mapRowToTimestamp = ({ timestamp }: AnalyticsEngineRow): number =>
  new Date(timestamp).getTime() / MILLISECONDS_PER_SECOND;

export default function datumFactoryFactory(
  this: Worker,
  index: string,
): (row: AnalyticsEngineRow) => Datum {
  if (!isMetricName(index)) {
    this.emitPrivateMetric({
      name: MetricName.InvalidAnalyticsMetricName,
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
    case MetricName.InvalidCookieDomain:
    case MetricName.InvalidDataBucket:
    case MetricName.InvalidDatabase:
    case MetricName.InvalidEnvironmentName:
    case MetricName.InvalidHost:
    case MetricName.InvalidInvalidPatreonAccessTokenRequestDescription:
    case MetricName.InvalidOAuthUserId:
    case MetricName.InvalidPatreonAccessToken:
    case MetricName.InvalidPatreonAccessTokenError:
    case MetricName.InvalidPatreonAccessTokenErrorBody:
    case MetricName.InvalidPatreonAccessTokenRequest:
    case MetricName.InvalidPatreonClientId:
    case MetricName.InvalidPatreonGrantCode:
    case MetricName.InvalidPatreonIdentity:
    case MetricName.InvalidPatreonIdentityAttributes:
    case MetricName.InvalidPatreonIdentityData:
    case MetricName.InvalidPatreonIdentityId:
    case MetricName.InvalidPatreonIdentityResponse:
    case MetricName.InvalidPatreonOAuthClientId:
    case MetricName.InvalidPatreonOAuthClientSecret:
    case MetricName.InvalidPatreonOAuthHost:
    case MetricName.InvalidPatreonOAuthRedirectUri:
    case MetricName.InvalidPatreonOAuthToken:
    case MetricName.InvalidPatreonOAuthTokenResponse:
    case MetricName.InvalidPrivateDataset:
    case MetricName.InvalidPublicDataset:
    case MetricName.InvalidReturnPath:
    case MetricName.InvalidStateSessionId:
    case MetricName.InvalidTraceParent:
    case MetricName.InvalidUsageDataset:
    case MetricName.MissingAuthnUserIdsNamespace:
    case MetricName.MissingCookieDomain:
    case MetricName.MissingDataBucket:
    case MetricName.MissingDatabase:
    case MetricName.MissingEnvironmentName:
    case MetricName.MissingHost:
    case MetricName.MissingIP:
    case MetricName.MissingInvalidPatreonAccessTokenRequestDescription:
    case MetricName.MissingIsolateEnvironment:
    case MetricName.MissingPatreonAccessToken:
    case MetricName.MissingPatreonAccessTokenErrorBody:
    case MetricName.MissingPatreonAccessTokenErrorCode:
    case MetricName.MissingPatreonIdentityAttributes:
    case MetricName.MissingPatreonIdentityData:
    case MetricName.MissingPatreonIdentityId:
    case MetricName.MissingPatreonOAuthClientId:
    case MetricName.MissingPatreonOAuthClientSecret:
    case MetricName.MissingPatreonOAuthHost:
    case MetricName.MissingPatreonOAuthRedirectUri:
    case MetricName.MissingPatreonRequestCode:
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
    case MetricName.UnknownPatreonAccessTokenErrorCode:
    case MetricName.UnknownPatreonIdentityError:
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
