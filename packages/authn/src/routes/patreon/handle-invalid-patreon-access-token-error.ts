import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessTokenError(
  body: string,
  json: unknown,
): never {
  emitPrivateMetric({
    name: MetricName.InvalidPatreonAccessTokenError,
    value: body,
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonAccessTokenError,
    type: typeof json,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessTokenError);
}
