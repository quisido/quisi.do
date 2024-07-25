import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonAccessTokenErrorCode(
  body: string,
  json: Record<string, unknown>,
): never {
  emitPrivateMetric({
    name: MetricName.MissingPatreonAccessTokenErrorCode,
    value: body,
  });

  emitPublicMetric({
    keys: Object.keys(json).join(', '),
    name: MetricName.MissingPatreonAccessTokenErrorCode,
  });

  throw new FatalError(ErrorCode.MissingPatreonAccessTokenErrorCode);
}
