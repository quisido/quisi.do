import { describe, expect, it } from 'vitest';
import { TestResponse } from './index.js';

describe('TestResponse', (): void => {
  it('checks the status and headers of a response', async (): Promise<void> => {
    const response = new Response(null, {
      headers: { 'X-Test': 'value' },
      status: 201,
    });

    const testResponse: TestResponse = await TestResponse.from(response);

    testResponse.expectStatusCodeToBe(201);
    testResponse.expectHeaderToBe('x-test', 'value');
    testResponse.expectHeadersToBe({ 'x-test': 'value' });
    expect((): void => testResponse.expectStatusCodeToBe(200)).toThrow();
    expect((): void =>
      testResponse.expectHeaderToBe('x-test', 'other'),
    ).toThrow();
    expect((): void => testResponse.expectHeadersToBe({})).toThrow();
  });

  it('checks a text body after reading the response', async (): Promise<void> => {
    const response = new Response('example');

    const testResponse: TestResponse = await TestResponse.from(response);

    testResponse.expectBodyToBe('example');
    testResponse.expectBodyToBe('example');
    expect((): void => testResponse.expectBodyToBe('other')).toThrow();
    expect(testResponse.expectNoBody).toThrow();
  });

  it('compares JSON bodies by value', async (): Promise<void> => {
    const response = new Response('{"enabled":true,"count":2}');

    const testResponse: TestResponse = await TestResponse.from(response);

    testResponse.expectBodyToBe({ count: 2, enabled: true });
    expect((): void =>
      testResponse.expectBodyToBe({ count: 3, enabled: true }),
    ).toThrow();
  });

  it('checks that an empty response has no body', async (): Promise<void> => {
    const response = new Response(null, { status: 204 });

    const testResponse: TestResponse = await TestResponse.from(response);

    testResponse.expectNoBody();
    expect((): void => testResponse.expectBodyToBe('example')).toThrow();
  });
});
