import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';
import getPatreonRequestCode from './get-patreon-request-code.js';

export default function handleInvalidPatreonGrantCode(
  this: AuthnFetchHandler,
): never {
  this.emitPublicMetric(MetricName.InvalidPatreonGrantCode);
  this.emitPrivateMetric(MetricName.InvalidPatreonGrantCode, {
    code: getPatreonRequestCode.call(this),
  });

  throw new FatalError(ErrorCode.InvalidPatreonGrantCode);
}
