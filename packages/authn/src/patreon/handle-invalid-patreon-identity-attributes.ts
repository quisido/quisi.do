import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';

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
  const { emitPrivateMetric, emitPublicMetric } = this;
  if (typeof attributes === 'undefined') {
    emitPublicMetric(MetricName.MissingPatreonIdentityAttributes);
    emitPrivateMetric(MetricName.MissingPatreonIdentityAttributes, {
      data: JSON.stringify(data),
    });

    return { id };
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonIdentityAttributes, {
    value: JSON.stringify(attributes),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonIdentityAttributes, {
    type: typeof attributes,
  });

  return { id };
}
