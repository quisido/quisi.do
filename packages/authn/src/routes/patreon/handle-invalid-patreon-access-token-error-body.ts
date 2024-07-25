import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessTokenErrorBody(
  body: string,
): never {
  emitPublicMetric({ name: MetricName.InvalidPatreonAccessTokenErrorBody });
  emitPrivateMetric({
    name: MetricName.InvalidPatreonAccessTokenErrorBody,
    value: body,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessTokenErrorBody);
}
