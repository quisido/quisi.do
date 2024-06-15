import { describe, expect, it, vi } from 'vitest';
import { StatusCode } from '../constants/status-code.js';
import handleFetch from './handle-fetch.js';

const ONCE = 1;
const TEST_CONSOLE_LOG = vi.fn();

const TEST_CONSOLE: Console = {
  ...console,
  log: TEST_CONSOLE_LOG,
};

const TEST_EXECUTION_CONTEXT: ExecutionContext = {
  passThroughOnException: vi.fn(),
  waitUntil: vi.fn(),
};

describe('handleFetch', (): void => {
  it('should return an Internal Server Error when isolate environment is invalid', async (): Promise<void> => {
    const response: Response = await handleFetch(
      TEST_CONSOLE,
      new Request('https://localhost/'),
      null,
      TEST_EXECUTION_CONTEXT,
    );

    expect(TEST_CONSOLE_LOG).toHaveBeenCalledTimes(ONCE);
    expect(TEST_CONSOLE_LOG).toHaveBeenLastCalledWith('Invalid isolate environment');
    expect(response.status).toBe(StatusCode.InternalServerError);
  });

  it('should return Method Not Allowed for invalid methods', async (): Promise<void> => {
    const response: Response = await handleFetch(
      TEST_CONSOLE,
      new Request('https://localhost/', {
        method: 'PUT',
      }),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(TEST_CONSOLE_LOG).toHaveBeenCalledTimes(ONCE);
    expect(TEST_CONSOLE_LOG).toHaveBeenLastCalledWith('Method not allowed');
    expect(response.status).toBe(StatusCode.MethodNotAllowed);
  });
});
