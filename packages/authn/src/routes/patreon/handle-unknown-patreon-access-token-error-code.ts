import { ErrorCode } from '@quisido/authn-shared';
import { mapUnknownToString } from 'fmrs';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleUnknownPatreonAccessTokenErrorCode(
  code: unknown,
  json: Record<string, unknown>,
): never {
  emitPublicMetric({ name: MetricName.UnknownPatreonAccessTokenErrorCode });
  emitPrivateMetric({
    code: mapUnknownToString(code),
    name: MetricName.UnknownPatreonAccessTokenErrorCode,
    value: JSON.stringify({
      ...json,
      error: undefined,
    }),
  });

  throw new FatalError(ErrorCode.UnknownPatreonAccessTokenErrorCode);
}
