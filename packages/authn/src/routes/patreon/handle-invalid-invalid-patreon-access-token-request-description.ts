import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidInvalidPatreonAccessTokenRequestDescription(
  this: Worker,
  json: Record<string, unknown>,
  description: unknown,
): never {
  this.emitPrivateMetric({
    name: MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
    value: JSON.stringify({
      ...json,
      error: undefined,
    }),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
    type: typeof description,
  });

  throw new FatalError(
    ErrorCode.InvalidInvalidPatreonAccessTokenRequestDescription,
  );
}
