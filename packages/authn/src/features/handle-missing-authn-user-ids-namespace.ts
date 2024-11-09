import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function handleMissingAuthnUserIdsNamespace(
  this: AuthnFetchHandler,
): never {
  this.emitPublicMetric(MetricName.MissingAuthnUserIdsNamespace);
  throw new FatalError(ErrorCode.MissingAuthnUserIdsNamespace);
}
