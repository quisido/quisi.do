import { describe, expect, it } from 'vitest';
import { TestResponse } from './index.js';

describe('TestResponse', (): void => {
  it('checks text bodies and rejects mismatches', async (): Promise<void> => {
    const response = new Response('Hello');

    const testResponse: TestResponse = await TestResponse.from(response);

    testResponse.expectBodyToBe('Hello');
    expect((): void => {
      testResponse.expectBodyToBe('Goodbye');
    }).toThrow();
  });

  it('checks JSON bodies independently of key order', async (): Promise<void> => {
    const response = new Response('{"ready":true,"count":2}');

    const testResponse: TestResponse = await TestResponse.from(response);

    testResponse.expectBodyToBe({ count: 2, ready: true });
    expect((): void => {
      testResponse.expectBodyToBe({ ready: false });
    }).toThrow();
  });

  it('checks empty bodies and status codes', async (): Promise<void> => {
    const response = new Response(null, { status: 204 });

    const testResponse: TestResponse = await TestResponse.from(response);

    testResponse.expectNoBody();
    testResponse.expectStatusCodeToBe(204);
    expect((): void => {
      testResponse.expectStatusCodeToBe(200);
    }).toThrow();
  });

  it('rejects a nonempty body when no body is expected', async (): Promise<void> => {
    const response = new Response('Hello');

    const testResponse: TestResponse = await TestResponse.from(response);

    expect((): void => {
      testResponse.expectNoBody();
    }).toThrow();
  });

  it('checks individual headers and the complete header set', async (): Promise<void> => {
    const response = new Response(null, {
      headers: { 'Cache-Control': 'no-store', 'X-Result': 'ready' },
    });

    const testResponse: TestResponse = await TestResponse.from(response);

    testResponse.expectHeaderToBe('X-RESULT', 'ready');
    testResponse.expectHeadersToBe({
      'cache-control': 'no-store',
      'x-result': 'ready',
    });
    expect((): void => {
      testResponse.expectHeaderToBe('x-result', 'pending');
    }).toThrow();
    expect((): void => {
      testResponse.expectHeaderToBe('x-missing', 'ready');
    }).toThrow();
    expect((): void => {
      testResponse.expectHeadersToBe({ 'x-result': 'ready' });
    }).toThrow();
  });
});
