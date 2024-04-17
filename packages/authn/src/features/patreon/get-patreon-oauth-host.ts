import { ErrorCode } from '@quisido/authn-shared';
import getEnv from '../../utils/get-env.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';
import getTelemetry from '../../utils/get-telemetry.js';
import MetricName from '../../constants/metric-name.js';

const DEFAULT_PATREON_OAUTH_HOST = 'https://www.patreon.com';

export default function getPatreonOAuthHost(): string {
  const { PATREON_OAUTH_HOST } = getEnv();
  const { emitPublicMetric } = getTelemetry();

  if (typeof PATREON_OAUTH_HOST === 'undefined') {
    emitPublicMetric({
      name: MetricName.MissingPatreonOAuthHost,
    });
    return DEFAULT_PATREON_OAUTH_HOST;
  }

  if (typeof PATREON_OAUTH_HOST !== 'string') {
    throw mapCauseToError({
      code: ErrorCode.InvalidPatreonOAuthHost,
      privateData: PATREON_OAUTH_HOST,
      publicData: typeof PATREON_OAUTH_HOST,
    });
  }

  return PATREON_OAUTH_HOST;
}
