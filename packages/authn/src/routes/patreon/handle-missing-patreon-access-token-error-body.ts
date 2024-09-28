import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonAccessTokenErrorBody(this: Worker): never {
  this.emitPublicMetric({ name: MetricName.MissingPatreonAccessTokenErrorBody });
  throw new FatalError(ErrorCode.MissingPatreonAccessTokenErrorBody);
}
