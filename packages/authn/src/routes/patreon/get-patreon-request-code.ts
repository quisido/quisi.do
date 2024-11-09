import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonRequestCode(this: AuthnFetchHandler): string {
  const code: string | null = this.getRequestSearchParam('code');

  if (code === null) {
    this.emitPublicMetric(MetricName.MissingPatreonRequestCode);
    throw new FatalError(ErrorCode.MissingPatreonRequestCode);
  }

  return code;
}
