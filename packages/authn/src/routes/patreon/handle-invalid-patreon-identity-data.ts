import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';
import handleMissingPatreonIdentityData from './handle-missing-patreon-identity-data.js';

export default function handleInvalidPatreonIdentityData(this: Worker,data: unknown): never {
  if (typeof data === 'undefined') {
    return handleMissingPatreonIdentityData.call(this);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonIdentityData,
    value: JSON.stringify(data),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonIdentityData,
    type: typeof data,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityData);
}
