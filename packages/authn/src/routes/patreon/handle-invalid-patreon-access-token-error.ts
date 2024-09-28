import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessTokenError(
  this: Worker,
  body: string,
  json: unknown,
): never {
  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonAccessTokenError,
    value: body,
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonAccessTokenError,
    type: typeof json,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessTokenError);
}
