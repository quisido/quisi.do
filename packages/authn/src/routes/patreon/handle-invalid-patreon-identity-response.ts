import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonIdentityResponse(): never {
  emitPublicMetric({ name: MetricName.InvalidPatreonIdentityResponse });
  throw new FatalError(ErrorCode.InvalidPatreonIdentityResponse);
}
