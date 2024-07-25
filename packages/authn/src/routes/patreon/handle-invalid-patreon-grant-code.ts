import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';
import getPatreonRequestCode from './get-patreon-request-code.js';

export default function handleInvalidPatreonGrantCode(): never {
  emitPublicMetric({ name: MetricName.InvalidPatreonGrantCode });
  emitPrivateMetric({
    code: getPatreonRequestCode(),
    name: MetricName.InvalidPatreonGrantCode,
  });

  throw new FatalError(ErrorCode.InvalidPatreonGrantCode);
}
