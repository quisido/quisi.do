import { ErrorCode } from '@quisido/authn-shared';
import type { UsageType } from '@quisido/workers-shared';
import getEnv from '../utils/get-env.js';
import isAnaylticsEngineDataset from '../utils/is-analytics-engine-dataset.js';
import mapCauseToError from '../utils/map-cause-to-error.js';

type Use = UseCount & UsePer;

type UseCount = (account: number, type: UsageType, count?: number | undefined) => void;

type UsePer = (account: number, type: UsageType, count: number, per: number) => void;

export default function getUsage(): Use {
  const { USAGE } = getEnv();
  if (!isAnaylticsEngineDataset(USAGE)) {
    throw mapCauseToError({
      code: ErrorCode.InvalidUsageDataset,
      privateData: JSON.stringify(USAGE),
      publicData: typeof USAGE,
    });
  }

  return function use(
    account: number,
    type: UsageType,
    count: number = 1,
    per: number = 1,
  ): void {
    USAGE.writeDataPoint({
      doubles: [type, count, per],
      indexes: [account.toString()],
    });
  }
}
