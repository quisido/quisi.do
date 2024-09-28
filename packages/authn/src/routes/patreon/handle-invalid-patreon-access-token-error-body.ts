import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessTokenErrorBody(this: Worker,
  body: string,
): never {
  this.emitPublicMetric({ name: MetricName.InvalidPatreonAccessTokenErrorBody });
  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonAccessTokenErrorBody,
    value: body,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessTokenErrorBody);
}
