import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonAccessTokenErrorCode(this: Worker,
  body: string,
  json: Record<string, unknown>,
): never {
  this.emitPrivateMetric({
    name: MetricName.MissingPatreonAccessTokenErrorCode,
    value: body,
  });

  this.emitPublicMetric({
    keys: Object.keys(json).join(', '),
    name: MetricName.MissingPatreonAccessTokenErrorCode,
  });

  throw new FatalError(ErrorCode.MissingPatreonAccessTokenErrorCode);
}
