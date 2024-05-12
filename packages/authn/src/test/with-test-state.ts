import stateVar from '../constants/state-var.js';
import State from '../features/state.js';
import assert from '../utils/assert.js';
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

const ONCE = 1;
const TEST_LOG_PRIVATE_ERROR = jest.fn();
const TEST_SESSION_ID = '0123456789abcdef';
const TEST_WRITE_PRIVATE_DATAPOINT = jest.fn();
const TEST_WRITE_PUBLIC_DATAPOINT = jest.fn();
const TEST_WRITE_USAGE_DATAPOINT = jest.fn();

const TEST_CTX: ExecutionContext = {
  passThroughOnException: jest.fn(),
  waitUntil: jest.fn(),
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
  const state: State = new State(
    jest.fn(),
    TEST_CONSOLE,
    mapSessionIdToRequest(TEST_SESSION_ID),
    TEST_CTX,
    '0123456789abcdef0123456789abcdef',
  );

  const result: R = stateVar.run(state, (): R => {
    state.setEnv(TEST_ENV);
    state.setReturnHref();
    assert(state.telemetry !== null);
    state.telemetry.onPrivateError(TEST_LOG_PRIVATE_ERROR);
    const runResult: R = fn();
    state.flushTelemetry();
    return runResult;
  });

  return {
    result,

    expectPrivateError(err: Error): void {
      expect(TEST_LOG_PRIVATE_ERROR).toHaveBeenCalledTimes(ONCE);
      expect(TEST_LOG_PRIVATE_ERROR).toHaveBeenLastCalledWith(err);
    },

    expectPublicDataPoint(datapoint: AnalyticsEngineDataPoint): void {
      expect(TEST_WRITE_PUBLIC_DATAPOINT).toHaveBeenCalledTimes(ONCE);
      expect(TEST_WRITE_PUBLIC_DATAPOINT).toHaveBeenLastCalledWith(datapoint);
    },
  };
}
