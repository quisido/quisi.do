export const TEST_CONSOLE_ERROR = jest.fn();
export const TEST_CONSOLE_LOG = jest.fn();
export const TEST_CONSOLE_WARN = jest.fn();

export const TEST_CONSOLE: Console = {
  ...console,
  error: TEST_CONSOLE_ERROR,
  log: TEST_CONSOLE_LOG,
  warn: TEST_CONSOLE_WARN,
};
