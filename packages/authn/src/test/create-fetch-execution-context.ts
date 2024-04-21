export default function createFetchExecutionContext(
  waitUntil: (promise: Promise<unknown>) => void,
): ExecutionContext {
  return {
    passThroughOnException: jest.fn(),
    waitUntil,
  };
}
