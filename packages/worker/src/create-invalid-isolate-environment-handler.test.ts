import { StatusCode } from 'cloudflare-utils';
import { describe, expect, it } from 'vitest';
import expectToLogError from './test/expect-to-log-error.js';
import { TEST_EXECUTION_CONTEXT } from './test/test-execution-context.js';
import TestWorker from './test/test-worker.js';

describe('createInvalidIsolateEnvironmentHandler', (): void => {
  it('should handle missing isolate environments', async (): Promise<void> => {
    const { fetch } = new TestWorker();
    const { headers, status } = await fetch(
      new Request('https://localhost/'),
      undefined,
      TEST_EXECUTION_CONTEXT,
    );

    expectToLogError('Missing isolate environment');
    expect(status).toBe(StatusCode.InternalServerError);
    expect(headers.get('access-control-allow-headers')).toBe('*');
    expect(headers.get('access-control-allow-methods')).toBe('*');
    expect(headers.get('access-control-allow-origin')).toBe('*');
    expect(headers.get('access-control-max-age')).toBe('0');
    expect(headers.get('allow')).toBe('*');
  });

  it('should handle invalid isolate environments', async (): Promise<void> => {
    const { fetch } = new TestWorker();
    const { headers, status } = await fetch(
      new Request('https://localhost/'),
      'test invalid isolate environment',
      TEST_EXECUTION_CONTEXT,
    );

    expect(status).toBe(StatusCode.InternalServerError);
    expect(headers.get('access-control-allow-headers')).toBe('*');
    expect(headers.get('access-control-allow-methods')).toBe('*');
    expect(headers.get('access-control-allow-origin')).toBe('*');
    expect(headers.get('access-control-max-age')).toBe('0');
    expect(headers.get('allow')).toBe('*');
    expectToLogError(
      'Invalid isolate environment',
      'test invalid isolate environment',
    );
  });
});
