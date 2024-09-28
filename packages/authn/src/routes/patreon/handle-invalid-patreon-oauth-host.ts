import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonOAuthHost(this: Worker, host: unknown): never {
  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthHost,
    value: JSON.stringify(host),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthHost,
    type: typeof host,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthHost);
}
