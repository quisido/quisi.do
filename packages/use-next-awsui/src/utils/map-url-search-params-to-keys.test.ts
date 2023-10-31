/// <reference types="jest" />
import mapUrlSearchParamsToKeys from './map-url-search-params-to-keys.js';

describe('mapUrlSearchParamsToKeys', (): void => {
  it('should return an empty array when there are no search params', (): void => {
    expect(mapUrlSearchParamsToKeys(new URLSearchParams())).toEqual([]);
  });

  it('should return the keys of URL search params', (): void => {
    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.append('foo', 'bar');
    searchParams.append('baz', 'qux');
    expect(mapUrlSearchParamsToKeys(searchParams)).toEqual(['foo', 'baz']);
  });
});
