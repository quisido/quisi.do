import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonRequestCode(this: Worker): string {
  const code: string | null = this.getRequestSearchParam('code');

  if (code === null) {
    this.emitPublicMetric({ name: MetricName.MissingPatreonRequestCode });
    throw new FatalError(ErrorCode.MissingPatreonRequestCode);
  }

  return code;
}
