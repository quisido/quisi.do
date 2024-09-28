import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingInvalidPatreonAccessTokenRequestDescription(this: Worker,
  json: Record<string, unknown>,
): never {
  this.emitPrivateMetric({
    name: MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
    value: JSON.stringify({
      ...json,
      error: undefined,
    }),
  });

  this.emitPublicMetric({
    name: MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
  });

  throw new FatalError(
    ErrorCode.MissingInvalidPatreonAccessTokenRequestDescription,
  );
}
