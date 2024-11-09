import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function handleInvalidAuthnUserIdsNamespace(
  this: AuthnFetchHandler,
  namespace: unknown,
): never {
  this.emitPrivateMetric(MetricName.InvalidAuthnUserIdsNamespace, {
    value: JSON.stringify(namespace),
  });

  this.emitPublicMetric(MetricName.InvalidAuthnUserIdsNamespace, {
    type: typeof namespace,
  });

  throw new FatalError(ErrorCode.InvalidAuthnUserIdsNamespace);
}
