import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';

interface Options {
  readonly attributes: unknown;
  readonly data: Record<string, unknown>;
  readonly id: string;
}

interface Result {
  readonly id: string;
}

export default function handleInvalidPatreonIdentityAttributes(
  this: Worker,
  { attributes, data, id }: Options,
): Result {
  if (typeof attributes === 'undefined') {
    this.emitPublicMetric({
      name: MetricName.MissingPatreonIdentityAttributes,
    });

    this.emitPrivateMetric({
      data: JSON.stringify(data),
      name: MetricName.MissingPatreonIdentityAttributes,
    });

    return {
      id,
    };
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonIdentityAttributes,
    value: JSON.stringify(attributes),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonIdentityAttributes,
    type: typeof attributes,
  });

  return {
    id,
  };
}
