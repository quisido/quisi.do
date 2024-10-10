import { describe, expect, it } from 'vitest';
import mapRequestInitToTestHeaders from './map-request-init-to-test-headers.js';

describe('mapRequestInitToTestHeaders', (): void => {
  it('should support traceparent', (): void => {
    expect(
      mapRequestInitToTestHeaders({
        headers: {
          cookie: 'test',
          traceparent: '1234',
        },
      }),
    ).toEqual(
      new Headers({
        cookie: 'test',
        traceparent: '1234',
      }),
    );
  });
});
