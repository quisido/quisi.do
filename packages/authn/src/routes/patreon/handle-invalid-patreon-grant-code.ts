import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';
import getPatreonRequestCode from './get-patreon-request-code.js';

export default function handleInvalidPatreonGrantCode(this: Worker,): never {
  this.emitPublicMetric({ name: MetricName.InvalidPatreonGrantCode });
  this.emitPrivateMetric({
    code: getPatreonRequestCode.call(this),
    name: MetricName.InvalidPatreonGrantCode,
  });

  throw new FatalError(ErrorCode.InvalidPatreonGrantCode);
}
