import type { NEXT_DATA } from 'next/dist/shared/lib/utils.js';
import getNextData from './get-next-data.js';

describe('getNextData', (): void => {
  it('should return __NEXT_DATA__ if it exists', (): void => {
    const TEST_NEXT_DATA: NEXT_DATA = {
      buildId: 'mock-next-router',
      page: '/',
      props: {},
      query: {},
    };

    window.__NEXT_DATA__ = TEST_NEXT_DATA;
    expect(getNextData()).toBe(TEST_NEXT_DATA);
  });
});
