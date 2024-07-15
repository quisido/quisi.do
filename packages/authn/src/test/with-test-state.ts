import { expect, vi } from 'vitest';
import { STATE_VAR } from '../constants/state-var.js';
import AuthnState from '../features/authn-state.js';
import mapSessionIdToRequest from './map-session-id-to-request.js';
import { TEST_CONSOLE } from './test-console.js';

/**
 *   `withTestState` allows you to inject a mocked state variable value. This
 * should ONLY be used to test code branches that are [theoretically] impossible
 * to trigger, such as types of errors that cannot be forcefully thrown.
 */

interface Result<R> {
  readonly expectPrivateError: (err: Error) => void;
  readonly expectPublicDataPoint: (datapoint: AnalyticsEngineDataPoint) => void;
  readonly result: R;
}

const TEST_LOG_PRIVATE_ERROR = vi.fn();
const TEST_SESSION_ID = '0123456789abcdef';
const TEST_WRITE_PRIVATE_DATAPOINT = vi.fn();
const TEST_WRITE_PUBLIC_DATAPOINT = vi.fn();
const TEST_WRITE_USAGE_DATAPOINT = vi.fn();

const TEST_CTX: ExecutionContext = {
  passThroughOnException: vi.fn(),
  waitUntil: vi.fn(),
};

const TEST_ENV: Record<string, unknown> = {
  HOST: 'localhost',
  PRIVATE_DATASET: {
    writeDataPoint: TEST_WRITE_PRIVATE_DATAPOINT,
  } satisfies AnalyticsEngineDataset,
  PUBLIC_DATASET: {
    writeDataPoint: TEST_WRITE_PUBLIC_DATAPOINT,
  } satisfies AnalyticsEngineDataset,
  USAGE: {
    writeDataPoint: TEST_WRITE_USAGE_DATAPOINT,
  } satisfies AnalyticsEngineDataset,
};

export default function withTestState<R>(fn: () => R): Result<R> {
  // Create a mocked state implementation.
  const state: AuthnState = new AuthnState(
    TEST_CONSOLE,
    vi.fn(),
    mapSessionIdToRequest(TEST_SESSION_ID),
    TEST_ENV,
    TEST_CTX,
  );

  state.telemetry.on('error:private', TEST_LOG_PRIVATE_ERROR);

  const result: R = STATE_VAR.run(state, (): R => {
    state.setReturnHref();
    return fn();
  });

  return {
    result,

    expectPrivateError(err: Error): void {
      expect(TEST_LOG_PRIVATE_ERROR).toHaveBeenCalledWith(err);
    },

    expectPublicDataPoint(datapoint: AnalyticsEngineDataPoint): void {
      expect(TEST_WRITE_PUBLIC_DATAPOINT).toHaveBeenCalledWith(datapoint);
    },
  };
}
