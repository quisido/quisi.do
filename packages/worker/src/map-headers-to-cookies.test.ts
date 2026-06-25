import { describe, expect, it } from 'vitest';
import mapHeadersToCookies from './map-headers-to-cookies.js';

describe('mapHeadersToCookies', (): void => {
  it('should return no cookies without a Cookie header', (): void => {
    const cookies = mapHeadersToCookies(new Headers());

    expect(cookies).toEqual({});
  });

  it('should parse a Cookie header', (): void => {
    const cookies = mapHeadersToCookies(
      new Headers({
        cookie: 'num=123; str=str',
      }),
    );

    expect(cookies).toEqual({
      num: '123',
      str: 'str',
    });
  });
});
