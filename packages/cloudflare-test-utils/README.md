# Cloudflare test utilities

The Cloudflare test utilities module contains helper classes for unit testing
Cloudflare workers with `vitest`. You can mock your Cloudflare `env` bindings
for `AnalyticsEngineDataset`s, `D1Database`s, etc.

Cloudflare test utilities are compatible with
[`cloudflare-utils`](https://www.npmjs.com/package/cloudflare-utils). The mocked
instances implement their respective native Cloudflare interfaces and will
therefore pass validation.

## Analytics Engine datasets

The `TestAnalyticsEngineDataset` class allows you to expect data points to be
have been written.

```ts
import {
  EXPECT_ANY_NUMBER,
  TEST_EXECUTION_CONTEXT,
  TestAnalyticsEngineDataset,
} from 'cloudflare-test-utils';
import { describe, it, vi } from 'vitest';
import fetch from './fetch.js';

describe('fetch', (): void => {
  it('should emit a page view metric', async (): Promise<void> => {
    const MY_DATASET = new TestAnalyticsEngineDataset();

    await fetch(
      new Request('https://localhost/test/', {
        headers: new Headers({
          'cf-connecting-ip': '192.168.0.1',
          cookie: 'session-id=0123456789abcdef',
        }),
      }),
      {
        MY_DATASET,
      },
      TEST_EXECUTION_CONTEXT,
    );

    MY_DATASET.expectToHaveWrittenDataPoint({
      blobs: ['/test/', '0123456789abcdef'],
      doubles: [EXPECT_ANY_NUMBER, 3232235521],
      indexes: ['pageView'],
    });
  });
});
```

## D1 databases

The `TestD1Database` class allows you to mock query responses and errors.

```ts
import { StatusCode } from 'cloudflare-utils';
import { TEST_EXECUTION_CONTEXT, TestD1Database } from 'cloudflare-test-utils';
import { describe, it, vi } from 'vitest';
import fetch from './fetch.js';
import { SELECT_USER_BY_SESSION_ID } from './queries.js';

describe('fetch', (): void => {
  // Example: mocking a query response
  it('should query the current user', async (): Promise<void> => {
    const MY_DATABASE = new TestD1Database({
      [SELECT_USER_BY_SESSION_ID]: {
        results: [{
          id: 1234,
          name: 'Test User',
        }],
      },
    });

    const response: Response = await fetch(
      new Request('https://localhost/whoami/', {
        headers: new Headers({
          cookie: 'session-id=0123456789abcdef',
        }),
      }),
      {
        MY_DATABASE,
      },
      TEST_EXECUTION_CONTEXT,
    );

    MY_DATABASE.expectToHaveQueried(
      SELECT_USER_BY_SESSION_ID,
      ['0123456789abcdef'],
    );

    expect(await response.json()).toEqual({
      id: 1234,
      name: 'Test User',
    });
  });

  // Example: mocking a query error
  it('should respond with a 404 when the query fails', async (): Promise<void> => {
    const MY_DATABASE = new TestD1Database({
      [SELECT_USER_BY_SESSION_ID]: {
        error: new Error('test message'),
      },
    });

    const response: Response = await fetch(
      new Request('https://localhost/test/', {
        headers: new Headers({
          cookie: 'session-id=0123456789abcdef',
        }),
      }),
      {
        MY_DATABASE,
      },
      TEST_EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(StatusCode.NotFound);
  });
});
```

## KV namespaces

The `TestKVNamespace` class allows you to mock your key-value pairs.

```ts
import { TEST_EXECUTION_CONTEXT, TestKVNamespace } from 'cloudflare-test-utils';
import { describe, it, vi } from 'vitest';
import fetch from './fetch.js';

describe('fetch', (): void => {
  it('should read from the KV namespace', async (): Promise<void> => {
    const MY_NAMESPACE = new TestKVNamespace({
      TEST_KEY: 'test value',
    });

    const response: Response = await fetch(
      new Request('https://localhost/get?key=TEST_KEY'),
      {
        MY_NAMESPACE,
      },
      TEST_EXECUTION_CONTEXT,
    );

    expect(await response.text()).toBe('test value');
  });

  it('should write to the KV namespace', async (): Promise<void> => {
    const MY_NAMESPACE = new TestKVNamespace();

    await fetch(
      new Request('https://localhost/put?key=TEST_KEY&value=test%20value'),
      {
        MY_NAMESPACE,
      },
      TEST_EXECUTION_CONTEXT,
    );

    MY_NAMESPACE.expectToHavePut('TEST_KEY', 'test value');
  });
});
```

## R2 buckets

The `TestR2Bucket` class allows you to mock R2 bucket methods.

```ts
import { TEST_EXECUTION_CONTEXT, TestR2Bucket } from 'cloudflare-test-utils';
import { describe, it, vi } from 'vitest';
import fetch from './fetch.js';

describe('fetch', (): void => {
  it('should store', async (): Promise<void> => {
    const MY_BUCKET = new TestR2Bucket();

    await fetch(
      new Request('https://localhost/test/'),
      {
        MY_BUCKET,
      },
      TEST_EXECUTION_CONTEXT,
    );
  });
});
```
