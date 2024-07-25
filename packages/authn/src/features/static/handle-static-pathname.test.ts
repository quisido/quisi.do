import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import Test from '../../test/test.js';

describe('handleStaticPathname', (): void => {
  describe('favicon.ico', (): void => {
    it('should emit and respond', async (): Promise<void> => {
      // Assemble
      const { expectPublicMetric, fetch } = new Test();

      // Act
      const { expectResponseHeadersToBe, expectResponseStatusToBe } =
        await fetch('https://localhost/favicon.ico');

      // Assert
      expectPublicMetric({ name: MetricName.FaviconIco });
      expectResponseStatusToBe(StatusCode.OK);
      expectResponseHeadersToBe({
        'access-control-allow-methods': 'GET',
        'access-control-max-age': '31536000',
        allow: 'GET',
        'cache-control': 'immutable, max-age=31536000, public',
        'content-type': 'image/x-icon; charset=utf-8',
      });
    });
  });

  describe('robots.txt', (): void => {
    it('should emit and respond', async (): Promise<void> => {
      // Assemble
      const { expectPublicMetric, fetch } = new Test();

      // Act
      const { expectResponseHeadersToBe, expectResponseStatusToBe } =
        await fetch('https://localhost/robots.txt');

      // Assert
      expectPublicMetric({ name: MetricName.RobotsTxt });
      expectResponseStatusToBe(StatusCode.OK);
      expectResponseHeadersToBe({
        'access-control-allow-methods': 'GET',
        'access-control-max-age': '31536000',
        allow: 'GET',
        'cache-control': 'immutable, max-age=31536000, public',
        'content-type': 'text/plain; charset=utf-8',
      });
    });
  });
});
