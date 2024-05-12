interface Options {
  readonly env: unknown;

  readonly writePrivateDataPoint: (
    event?: AnalyticsEngineDataPoint | undefined,
  ) => void;

  readonly writePublicDataPoint: (
    event?: AnalyticsEngineDataPoint | undefined,
  ) => void;

  readonly writeUsageDatapoint: (
    event?: AnalyticsEngineDataPoint | undefined,
  ) => void;
}

export default function createFetchEnv({
  env,
  writePrivateDataPoint,
  writePublicDataPoint,
  writeUsageDatapoint,
}: Options): unknown {
  if (typeof env !== 'object') {
    return env;
  }

  return {
    HOST: 'localhost',
    PRIVATE_DATASET: {
      writeDataPoint: writePrivateDataPoint,
    } satisfies AnalyticsEngineDataset,
    PUBLIC_DATASET: {
      writeDataPoint: writePublicDataPoint,
    } satisfies AnalyticsEngineDataset,
    USAGE: {
      writeDataPoint: writeUsageDatapoint,
    } satisfies AnalyticsEngineDataset,
    ...env,
  };
}
