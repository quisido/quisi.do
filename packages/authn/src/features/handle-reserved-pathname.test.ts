import MetricName from '../constants/metric-name.js';
import fetch from '../test/fetch.js';

describe('handleReservedPathname', (): void => {
  it('should handle `/favicon.ico`', async (): Promise<void> => {
    const { expectPublicDataPoint, expectResponseHeaderToBe } = await fetch({
      env: {},
      pathname: '/favicon.ico',
    });

    expectResponseHeaderToBe('Content-Type', 'image/x-icon; charset=utf-8');
    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [expect.any(Number) as number, 0, 0],
      indexes: [MetricName.FaviconIco],
    });
  });

  it('should handle `/robots.txt`', async (): Promise<void> => {
    const { expectPublicDataPoint, expectResponseHeaderToBe } = await fetch({
      env: {},
      pathname: '/robots.txt',
    });

    expectResponseHeaderToBe('Content-Type', 'text/plain; charset=utf-8');
    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [expect.any(Number) as number, 0, 0],
      indexes: [MetricName.RobotsTxt],
    });
  });
});
