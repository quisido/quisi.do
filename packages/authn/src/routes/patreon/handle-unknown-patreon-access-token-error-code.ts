import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { mapToString } from 'fmrs';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleUnknownPatreonAccessTokenErrorCode(
  this: Worker,
  code: unknown,
  json: Record<string, unknown>,
): never {
  this.emitPublicMetric({
    name: MetricName.UnknownPatreonAccessTokenErrorCode,
  });
  this.emitPrivateMetric({
    code: mapToString(code),
    name: MetricName.UnknownPatreonAccessTokenErrorCode,
    value: JSON.stringify({
      ...json,
      error: undefined,
    }),
  });

  throw new FatalError(ErrorCode.UnknownPatreonAccessTokenErrorCode);
}
