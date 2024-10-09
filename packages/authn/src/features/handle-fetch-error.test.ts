import Worker from "@quisido/worker";
import { StatusCode } from "cloudflare-utils";
import { describe, expect, it, vi } from "vitest";
import { MetricName } from "../constants/metric-name.js";
import unimplementedMethod from "../test/unimplemented-method.js";
import handleFetchError from "./handle-fetch-error.js";

const ONCE = 1;
const TEST_PRIVATE_ERROR_LOGGER = vi.fn();
const TEST_PUBLIC_METRIC_EMITTER = vi.fn();

describe('handleFetchError', (): void => {
  it('should emit, log, and respond', (): void => {
    const { headers, status } = handleFetchError.call(Object.assign(new Worker({
      invalidPrivateDatasetMetricName: '_', invalidPublicDatasetMetricName: '_',
      invalidTraceParentMetricName: '_',
      missingPrivateDatasetMetricName: '_',
      missingPublicDatasetMetricName: '_',
      missingTraceParentMetricName: '_',
      onFetchError: unimplementedMethod,
      onFetchRequest: unimplementedMethod,
    }), {
      emitPublicMetric: TEST_PUBLIC_METRIC_EMITTER,
      logPrivateError: TEST_PRIVATE_ERROR_LOGGER,
      getEnv(): unknown {
        return 'test.host';
      },
    }), 'test error');

    expect(TEST_PUBLIC_METRIC_EMITTER).toHaveBeenCalledTimes(ONCE);
    expect(TEST_PUBLIC_METRIC_EMITTER).toHaveBeenLastCalledWith({ name: MetricName.UnknownError });
    expect(TEST_PRIVATE_ERROR_LOGGER).toHaveBeenCalledTimes(ONCE);
    expect(TEST_PRIVATE_ERROR_LOGGER).toHaveBeenLastCalledWith(new Error('test error'));

    expect(status).toBe(StatusCode.SeeOther);
    expect([...headers.entries()]).toStrictEqual([
      ['access-control-allow-methods', 'GET'],
      ['allow', 'GET'],
      ['content-location', 'https://test.host/#authn:error=1'],
      ['location', 'https://test.host/#authn:error=1'],
    ]);
  });
});
