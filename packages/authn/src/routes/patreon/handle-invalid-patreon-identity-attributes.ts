import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';

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
  if (typeof attributes === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingPatreonIdentityAttributes });
    return {
      id,
    };
  }

  emitPrivateMetric({
    name: MetricName.InvalidPatreonIdentityAttributes,
    value: JSON.stringify(attributes),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonIdentityAttributes,
    type: typeof attributes,
  });

  return {
    id,
  };
}
