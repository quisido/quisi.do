import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonIdentityData(this: Worker): never {
  this.emitPublicMetric({ name: MetricName.MissingPatreonIdentityData });
  throw new FatalError(ErrorCode.MissingPatreonIdentityData);
}
