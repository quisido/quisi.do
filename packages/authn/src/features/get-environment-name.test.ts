import MetricName from '../constants/metric-name.js';
import fetch from '../test/fetch.js';

describe('getEnvironmentName', (): void => {
  it('should emit telemetry for a missing environment name', async (): Promise<void> => {
    const { expectPublicDataPoint } = await fetch({
      env: {},
    });

    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [expect.any(Number) as number, 0, 0],
      indexes: [MetricName.MissingEnvironmentName],
    });
  });

  it('should emit telemetry for an invalid environment name', async (): Promise<void> => {
    const { expectPublicDataPoint } = await fetch({
      env: {
        ENVIRONMENT_NAME: 'test-invalid-environment-name',
      },
    });

    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [expect.any(Number) as number, 0, 0],
      indexes: [MetricName.InvalidEnvironmentName],
    });

    // expectPrivateLog()
  });
});
