import { describe, expect, it } from 'vitest';
import { TestResponse } from './index.js';

describe('TestResponse', (): void => {
  it('checks the response body, headers, and status', async (): Promise<void> => {
    const response = new Response('created', {
      headers: { 'Content-Type': 'text/plain' },
      status: 201,
    });

    const testResponse = await TestResponse.from(response);

    testResponse.expectBodyToBe('created');
    testResponse.expectHeaderToBe('content-type', 'text/plain');
    testResponse.expectHeadersToBe({ 'content-type': 'text/plain' });
    testResponse.expectStatusCodeToBe(201);
    expect((): void => testResponse.expectBodyToBe('different')).toThrow();
    expect((): void => testResponse.expectNoBody()).toThrow();
    expect((): void =>
      testResponse.expectHeaderToBe('content-type', 'application/json'),
    ).toThrow();
    expect((): void => testResponse.expectHeadersToBe({})).toThrow();
    expect((): void => testResponse.expectStatusCodeToBe(200)).toThrow();
  });

  it('compares JSON response bodies as objects', async (): Promise<void> => {
    const response = Response.json({ success: true });

    const testResponse = await TestResponse.from(response);

    testResponse.expectBodyToBe({ success: true });
    expect((): void =>
      testResponse.expectBodyToBe({ success: false }),
    ).toThrow();
  });

  it('accepts a response with no body', async (): Promise<void> => {
    const response = new Response(null, { status: 204 });

    const testResponse = await TestResponse.from(response);

    testResponse.expectNoBody();
    testResponse.expectStatusCodeToBe(204);
  });
});
