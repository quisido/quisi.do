import { ErrorCode } from '@quisido/authn-shared';
import { Product, type UsageType } from '@quisido/workers-shared';
import getEnv from '../utils/get-env.js';
import isAnaylticsEngineDataset from '../utils/is-analytics-engine-dataset.js';
import mapCauseToError from '../utils/map-cause-to-error.js';

interface Options {
  readonly account: number;
  readonly count?: number | undefined;
  readonly per?: number | undefined;
  readonly type: UsageType;
}

const ONCE = 1;
const QUISIDO_AUTHENTICATION_PROJECT = 0;
const SINGLE = 1;

export default function getUsage(): (options: Options) => void {
  const { USAGE } = getEnv();
  if (!isAnaylticsEngineDataset(USAGE)) {
    throw mapCauseToError({
      code: ErrorCode.InvalidUsageDataset,
      privateData: JSON.stringify(USAGE),
      publicData: typeof USAGE,
    });
  }

  return function use({
    account,
    count = ONCE,
    per = SINGLE,
    type,
  }: Options): void {
    USAGE.writeDataPoint({
      doubles: [type, count, per],
      indexes: [
        account.toString(),
        Product.Authentication.toString(),
        QUISIDO_AUTHENTICATION_PROJECT.toString(),
      ],
    });
  }
}
