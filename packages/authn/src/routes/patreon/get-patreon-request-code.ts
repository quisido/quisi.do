import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import {
  emitPublicMetric,
  getRequestSearchParam,
} from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonRequestCode(): string {
  const code: string | null = getRequestSearchParam('code');

  if (code === null) {
    emitPublicMetric({ name: MetricName.MissingPatreonRequestCode });
    throw new FatalError(ErrorCode.MissingPatreonRequestCode);
  }

  return code;
}
