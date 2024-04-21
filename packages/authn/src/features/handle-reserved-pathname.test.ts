/// <reference types="jest" />
import MetricName from '../constants/metric-name.js';
import fetch from '../test/fetch.js';

const DEFAULT_TRACE_FLAGS = 0;
const DEFAULT_TRACE_VERSION = 0;

describe('handleReservedPathname', (): void => {
  it('should handle `/favicon.ico`', async (): Promise<void> => {
    const { expectPublicDataPoint, expectResponseHeaderToBe } = await fetch({
      env: {},
      pathname: '/favicon.ico',
    });

    expectResponseHeaderToBe('Content-Type', 'image/x-icon; charset=utf-8');
    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      indexes: [MetricName.FaviconIco],

      doubles: [
        expect.any(Number) as number,
        DEFAULT_TRACE_FLAGS,
        DEFAULT_TRACE_VERSION,
      ],
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
      indexes: [MetricName.RobotsTxt],

      doubles: [
        expect.any(Number) as number,
        DEFAULT_TRACE_FLAGS,
        DEFAULT_TRACE_VERSION,
      ],
    });
  });
});
