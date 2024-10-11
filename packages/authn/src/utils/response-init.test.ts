import { describe, expect, it } from 'vitest';
import ResponseInitImpl from './response-init.js';

const TEST_HEADERS = new Headers();
const TEST_STATUS = 404;
const TEST_STATUS_TEXT = 'Test Status Text';

describe('ResponseInitImpl', (): void => {
  it('should support initial properties', (): void => {
    const { headers, status, statusText } = new ResponseInitImpl({
      headers: TEST_HEADERS,
      status: TEST_STATUS,
      statusText: TEST_STATUS_TEXT,
    });

    expect(headers).toBe(TEST_HEADERS);
    expect(status).toBe(TEST_STATUS);
    expect(statusText).toBe(TEST_STATUS_TEXT);
  });

  it('should support optional properties', (): void => {
    const { headers, status, statusText } = new ResponseInitImpl({});

    expect(headers).toBeUndefined();
    expect(status).toBeUndefined();
    expect(statusText).toBeUndefined();
  });
});
