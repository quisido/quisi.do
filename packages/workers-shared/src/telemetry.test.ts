import { describe, expect, it, vi } from 'vitest';
import noop from './noop.js';
import Telemetry from './telemetry.js';
import { TEST_CONSOLE, TEST_CONSOLE_ERROR } from './test/console.js';
import { type TestMetric } from './test/metric.js';
import { TEST_TELEMETRY_OPTIONS } from './test/telemetry-options.js';

const TEST_EFFECT_CALLBACK = vi.fn();
const TEST_PRIVATE_METRIC_CALLBACK = vi.fn();

const TEST_TELEMETRY = new Telemetry<TestMetric>(
  TEST_CONSOLE,
  new Request('https://localhost/'),
  {},
  {
    passThroughOnException: vi.fn(),
    waitUntil: vi.fn(),
  },
  TEST_TELEMETRY_OPTIONS,
);

describe('Telemetry', (): void => {
  it('should emit effects', (): void => {
    const testPromise = new Promise(noop);
    TEST_TELEMETRY.on('effect', TEST_EFFECT_CALLBACK);

    TEST_TELEMETRY.affect(testPromise);

    expect(TEST_EFFECT_CALLBACK).toHaveBeenCalledOnce();
    expect(TEST_EFFECT_CALLBACK).toHaveBeenLastCalledWith(testPromise);
  });

  it('should emit private metrics', (): void => {
    TEST_TELEMETRY.on('metric:private', TEST_PRIVATE_METRIC_CALLBACK);

    TEST_TELEMETRY.emitPrivateMetric({
      name: 'test',
      number: 1234,
      string: 'str',
    });

    expect(TEST_PRIVATE_METRIC_CALLBACK).toHaveBeenCalledOnce();
    expect(TEST_PRIVATE_METRIC_CALLBACK).toHaveBeenLastCalledWith({
      name: 'test',
      number: 1234,
      string: 'str',
      timestamp: expect.any(Number) as number,
      traceFlags: 0,
      traceId: expect.any(String) as string,
      traceParentId: '0000000000000000',
      traceVersion: 0,
    });
  });

  it('should emit private logs', (): void => {
    const testError = new Error('test message', { cause: 'test cause' });
    TEST_TELEMETRY.logPrivateError(testError);

    expect(TEST_CONSOLE_ERROR).toHaveBeenCalledOnce();
    expect(TEST_CONSOLE_ERROR).toHaveBeenLastCalledWith(
      'test message',
      'test cause',
      expect.any(String) as string,
    );
  });
});
