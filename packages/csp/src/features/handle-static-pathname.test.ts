import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import TestCspExportedHandler from '../../test/test-csp-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';

describe('handleStaticPathname', (): void => {
  it('should handle favicon', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetch } =
      new TestCspExportedHandler();

    // Act
    const { expectHeaderToBe, expectStatusCodeToBe } =
      await fetch('/favicon.ico');

    // Assert
    expectHeaderToBe('content-type', 'image/x-icon; charset=utf-8');
    expectStatusCodeToBe(StatusCode.OK);
    expectToHaveEmitPublicMetric(MetricName.Favicon);
  });

  it('should handle robots', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetch } =
      new TestCspExportedHandler();

    // Act
    const { expectHeaderToBe, expectStatusCodeToBe } =
      await fetch('/robots.txt');

    // Assert
    expectHeaderToBe('content-type', 'text/plain; charset=utf-8');
    expectStatusCodeToBe(StatusCode.OK);
    expectToHaveEmitPublicMetric(MetricName.RobotsTxt);
  });
});
