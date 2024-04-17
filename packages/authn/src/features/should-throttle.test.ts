import { ErrorCode } from '@quisido/authn-shared';
import EnvironmentName from '../constants/environment-name.js';
import MetricName from '../constants/metric-name.js';
import fetch from '../test/fetch.js';

describe('shouldThrottle', (): void => {
  it('should emit telemetry when IP is missing', async (): Promise<void> => {
    const { expectPublicDataPoint } = await fetch({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
    });

    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [expect.any(Number) as number, 0, 0],
      indexes: [MetricName.MissingIP],
    });
  });

  it('should throttle the same IP twice', async (): Promise<void> => {
    const TEST_IP = '127.0.0.1';

    await fetch({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
      headers: {
        'CF-Connecting-IP': TEST_IP,
      },
    });

    const { expectPrivateDataPoint, expectPublicDataPoint } = await fetch({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
      headers: {
        'CF-Connecting-IP': TEST_IP,
      },
    });

    expectPrivateDataPoint({
      blobs: [TEST_IP, expect.any(String) as string, '0000000000000000'],
      doubles: [
        expect.any(Number) as number,
        expect.any(Number) as number,
        0,
        0,
      ],
      indexes: [MetricName.TooManyRequests],
    });

    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [
        expect.any(Number) as number,
        expect.any(Number) as number,
        0,
        0,
      ],
      indexes: [MetricName.TooManyRequests],
    });
  });

  it('should throttle the same IP twice', async (): Promise<void> => {
    const TEST_IP = '192.168.1.1';

    await fetch({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
      headers: {
        'CF-Connecting-IP': TEST_IP,
      },
    });

    const { expectErrorCodeRedirect } = await fetch({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
      headers: {
        'CF-Connecting-IP': TEST_IP,
      },
    });

    expectErrorCodeRedirect(ErrorCode.TooManyRequests);
  });
});
