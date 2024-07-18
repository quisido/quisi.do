import { MetricName } from '../../constants/metric-name.js';
import getTelemetry from '../../utils/get-telemetry.js';

interface Options {
  readonly attributes: unknown;
  readonly id: string;
}

interface Result {
  readonly id: string;
}

export default function handleInvalidPatreonIdentityAttributes({
  attributes,
  id,
}: Options): Result {
  const { emitPublicMetric } = getTelemetry();

  if (typeof attributes === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingPatreonIdentityAttributes });
    return {
      id,
    };
  }

  emitPublicMetric({
    name: MetricName.InvalidPatreonIdentityAttributes,
    type: typeof attributes,
  });

  return {
    id,
  };
}
