/// <reference types="jest" />
import MetricName from '../constants/metric-name.js';
import fetch from '../test/fetch.js';

const DEFAULT_TRACE_FLAGS = 0;
const DEFAULT_TRACE_VERSION = 0;

describe('getEnvironmentName', (): void => {
  it('should emit telemetry for a missing environment name', async (): Promise<void> => {
    const { expectPublicDataPoint } = await fetch({
      env: {},
      pathname: '/patreon/',
    });

    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      indexes: [MetricName.MissingEnvironmentName],

      doubles: [
        expect.any(Number) as number,
        DEFAULT_TRACE_FLAGS,
        DEFAULT_TRACE_VERSION,
      ],
    });
  });

  it('should emit telemetry for an invalid environment name', async (): Promise<void> => {
    const { expectPublicDataPoint } = await fetch({
      pathname: '/patreon/',

      env: {
        ENVIRONMENT_NAME: 'test-invalid-environment-name',
      },
    });

    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      indexes: [MetricName.InvalidEnvironmentName],

      doubles: [
        expect.any(Number) as number,
        DEFAULT_TRACE_FLAGS,
        DEFAULT_TRACE_VERSION,
      ],
    });

    // Eventually: expectPrivateLog()
  });
});
