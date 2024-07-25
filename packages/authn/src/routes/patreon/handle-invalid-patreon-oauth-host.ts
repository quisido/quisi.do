import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonOAuthHost(host: unknown): never {
  emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthHost,
    value: JSON.stringify(host),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthHost,
    type: typeof host,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthHost);
}
