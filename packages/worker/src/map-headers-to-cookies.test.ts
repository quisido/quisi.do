import { describe, expect, it } from 'vitest';
import mapHeadersToCookies from './map-headers-to-cookies.js';

describe('mapHeadersToCookies', (): void => {
  it('should return no cookies when the Cookie header is missing', (): void => {
    const headers = new Headers();

    const cookies = mapHeadersToCookies(headers);

    expect(cookies).toEqual({});
  });

  it('should parse Cookie header values', (): void => {
    const headers = new Headers({
      Cookie: 'session-id=test-session; display-name=Quisi%20Do',
    });

    const cookies = mapHeadersToCookies(headers);

    expect(cookies).toEqual({
      'display-name': 'Quisi Do',
      'session-id': 'test-session',
    });
  });
});
