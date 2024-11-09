import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';

interface Options {
  readonly attributes: unknown;
  readonly data: Record<string, unknown>;
  readonly id: string;
}

interface Result {
  readonly id: string;
}

export default function handleInvalidPatreonIdentityAttributes(
  this: AuthnFetchHandler,
  { attributes, data, id }: Options,
): Result {
  if (typeof attributes === 'undefined') {
    this.emitPublicMetric(MetricName.MissingPatreonIdentityAttributes);

    this.emitPrivateMetric(MetricName.MissingPatreonIdentityAttributes, {
      data: JSON.stringify(data),
    });

    return {
      id,
    };
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonIdentityAttributes, {
    value: JSON.stringify(attributes),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonIdentityAttributes, {
    type: typeof attributes,
  });

  return {
    id,
  };
}
