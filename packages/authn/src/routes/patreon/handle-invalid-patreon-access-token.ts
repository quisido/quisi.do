import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessToken(
  this: Worker,
  accessToken: unknown,
): never {
  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonAccessToken,
    value: JSON.stringify(accessToken),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonAccessToken,
    type: typeof accessToken,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessToken);
}
