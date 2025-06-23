import { describe, expect, it, vi } from 'vitest';
import Handler from './handler.js';
import {
  TEST_CONSOLE,
  TEST_EXECUTION_CONTEXT,
  TestKVNamespace,
} from 'cloudflare-test-utils';
import { Pricing } from 'cloudflare-utils';
import { SECONDS_PER_YEAR } from './time.js';

describe('Handler', (): void => {
  it('should support expensing storage with expiration TTL', async (): Promise<void> => {
    const testExpenseHandler = vi.fn();
    const testEnv = {
      TEST_ENV: new TestKVNamespace(),
    };

    const handler = new Handler(async function handler(
      this: Handler,
    ): Promise<Response> {
      await this.putKVNamespace('TEST_ENV', 'test-key', 'test value', {
        expirationTtl: 60,
      });
      return new Response();
    });

    handler.onExpense(testExpenseHandler);

    await handler.run(
      {
        console: TEST_CONSOLE,
        env: testEnv,
        fetch: vi.fn(),
      },
      new Request('https://localhost/'),
      testEnv,
      TEST_EXECUTION_CONTEXT,
    );

    expect(testExpenseHandler).toHaveBeenCalledTimes(2);

    expect(testExpenseHandler).toHaveBeenCalledWith(Pricing.KVKeysWritten, 1);
    expect(testExpenseHandler).toHaveBeenCalledWith(
      Pricing.KVStoredData,
      18 * 60,
    );
  });

  it('should support expensing storage with expiration timestamps', async (): Promise<void> => {
    const testExpenseHandler = vi.fn();
    const testEnv = {
      TEST_ENV: new TestKVNamespace(),
    };

    const handler = new Handler(async function handler(
      this: Handler,
    ): Promise<Response> {
      await this.putKVNamespace('TEST_ENV', 'test-key', 'test value', {
        expiration: 4567,
      });
      return new Response();
    });

    handler.onExpense(testExpenseHandler);

    await handler.run(
      {
        console: TEST_CONSOLE,
        env: testEnv,
        fetch: vi.fn(),
        now(): number {
          return 1234000;
        },
      },
      new Request('https://localhost/'),
      testEnv,
      TEST_EXECUTION_CONTEXT,
    );

    expect(testExpenseHandler).toHaveBeenCalledTimes(2);

    expect(testExpenseHandler).toHaveBeenCalledWith(Pricing.KVKeysWritten, 1);
    expect(testExpenseHandler).toHaveBeenCalledWith(
      Pricing.KVStoredData,
      18 * 3333,
    );
  });

  it('should support expensing storage with no defined expiration', async (): Promise<void> => {
    const testExpenseHandler = vi.fn();
    const testEnv = {
      TEST_ENV: new TestKVNamespace(),
    };

    const handler = new Handler(async function handler(
      this: Handler,
    ): Promise<Response> {
      await this.putKVNamespace('TEST_ENV', 'test-key', 'test value', {});
      return new Response();
    });

    handler.onExpense(testExpenseHandler);

    await handler.run(
      {
        console: TEST_CONSOLE,
        env: testEnv,
        fetch: vi.fn(),
      },
      new Request('https://localhost/'),
      testEnv,
      TEST_EXECUTION_CONTEXT,
    );

    expect(testExpenseHandler).toHaveBeenCalledTimes(2);

    expect(testExpenseHandler).toHaveBeenCalledWith(Pricing.KVKeysWritten, 1);
    expect(testExpenseHandler).toHaveBeenCalledWith(
      Pricing.KVStoredData,
      18 * SECONDS_PER_YEAR,
    );
  });
});
