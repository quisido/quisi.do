import { describe, expect, it } from 'vitest';
import { TestResponse } from './index.js';

describe('TestResponse', (): void => {
  it('checks response bodies, headers, and status codes', async (): Promise<void> => {
    const response = await TestResponse.from(
      new Response('Created', {
        headers: { 'Content-Type': 'text/plain' },
        status: 201,
      }),
    );

    response.expectBodyToBe('Created');
    response.expectHeaderToBe('content-type', 'text/plain');
    response.expectHeadersToBe({ 'content-type': 'text/plain' });
    response.expectStatusCodeToBe(201);

    expect((): void => response.expectBodyToBe('Wrong body')).toThrow();
    expect((): void => response.expectHeaderToBe('missing', 'value')).toThrow();
    expect((): void => response.expectHeadersToBe({})).toThrow();
    expect((): void => response.expectStatusCodeToBe(200)).toThrow();
    expect((): void => response.expectNoBody()).toThrow();
  });

  it('compares JSON bodies by value', async (): Promise<void> => {
    const response = await TestResponse.from(
      Response.json({ success: true, count: 1, message: 'Created' }),
    );

    response.expectBodyToBe({ message: 'Created', count: 1, success: true });

    expect((): void => response.expectBodyToBe({ success: false })).toThrow();
  });

  it('accepts an empty response body', async (): Promise<void> => {
    const response = await TestResponse.from(new Response(null, { status: 204 }));

    response.expectNoBody();
    response.expectStatusCodeToBe(204);
  });
});
