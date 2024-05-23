import { ErrorCode } from '@quisido/authn-shared';
import { Product, type UsageType } from '@quisido/workers-shared';
import { isAnalyticsEngineDataset } from 'cloudflare-utils';
import EnvironmentName from '../constants/environment-name.js';
import getEnv from '../utils/get-env.js';
import mapCauseToError from '../utils/map-cause-to-error.js';
import getConsole from './get-console.js';
import getEnvironmentName from './get-environment-name.js';

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
  const ENVIRONMENT_NAME: EnvironmentName = getEnvironmentName();
  if (!isAnalyticsEngineDataset(USAGE)) {
    if (ENVIRONMENT_NAME === EnvironmentName.Development) {
      const console: Console = getConsole();
      return function useDev({
        account,
        count = ONCE,
        per = SINGLE,
        type,
      }: Options): void {
        console.log({ account, count, per, type });
      };;
    }

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
      indexes: [account.toString()],

      doubles: [
        Product.Authentication,
        QUISIDO_AUTHENTICATION_PROJECT,
        type,
        count,
        per,
      ],
    });
  }
}
