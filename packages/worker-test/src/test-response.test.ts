import { describe, expect, it } from 'vitest';
import { TestResponse } from './index.js';

describe('TestResponse', (): void => {
  describe('expectBodyToBe', (): void => {
    it('accepts matching text and rejects different text', async (): Promise<void> => {
      const response: TestResponse = await TestResponse.from(
        new Response('expected body'),
      );

      response.expectBodyToBe('expected body');

      expect((): void => {
        response.expectBodyToBe('different body');
      }).toThrow();
    });

    it('compares JSON body values regardless of key order', async (): Promise<void> => {
      const response: TestResponse = await TestResponse.from(
        Response.json({ enabled: true, count: 1 }),
      );

      response.expectBodyToBe({ count: 1, enabled: true });

      expect((): void => {
        response.expectBodyToBe({ count: 1, enabled: false });
      }).toThrow();
    });
  });
});
