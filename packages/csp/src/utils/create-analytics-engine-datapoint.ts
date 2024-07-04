import { Product, UsageType } from '@quisido/workers-shared';

interface Options {
  readonly accountNumber: number;
  readonly count: number;
  readonly per?: number | undefined;
  readonly projectId: number;
  readonly usageType: UsageType;
}

const SINGLE = 1;

export default function createAnalyticsEngineDataPoint({
  accountNumber,
  count,
  per = SINGLE,
  projectId,
  usageType,
}: Options): AnalyticsEngineDataPoint {
  return {
    doubles: [Product.ContentSecurityPolicy, projectId, usageType, count, per],
    indexes: [accountNumber.toString()],
  };
}
