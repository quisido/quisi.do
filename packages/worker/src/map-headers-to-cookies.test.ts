import { describe, expect, it } from 'vitest';
import mapHeadersToCookies from './map-headers-to-cookies.js';

describe('mapHeadersToCookies', (): void => {
  it('should parse cookie headers', (): void => {
    const cookies: Partial<Record<string, string>> = mapHeadersToCookies(
      new Headers({
        cookie: 'num=123; str=str',
      }),
    );

    expect(cookies).toEqual({
      num: '123',
      str: 'str',
    });
  });

  it('should map missing cookie headers to empty cookies', (): void => {
    const cookies: Partial<Record<string, string>> = mapHeadersToCookies(
      new Headers(),
    );

    expect(cookies).toEqual({});
  });
});
