/// <reference types="jest" />
import { anonymize, identify, init, shutdown } from '@fullstory/browser';
import { renderHook } from '@testing-library/react';
import useFullStoryAPI from './use-fullstory-api.js';

describe('useFullStoryAPI', (): void => {
  it('should return the FullStory browser API by default', (): void => {
    const { result } = renderHook(useFullStoryAPI);

    expect(result.current).toStrictEqual({
      anonymize,
      identify,
      init,
      shutdown,
    });
  });
});
