import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonOAuthToken(this: Worker,token: unknown): never {
  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthToken,
    value: JSON.stringify(token),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthToken,
    type: typeof token,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthToken);
}
