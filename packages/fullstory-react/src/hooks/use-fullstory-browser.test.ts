/// <reference types="jest" />
import * as fullStoryBrowser from '@fullstory/browser';
import { renderHook } from '@testing-library/react';
import useFullStoryBrowser from './use-fullstory-browser.js';

describe('useFullStoryBrowser', (): void => {
  it('should return the FullStory browser API by default', (): void => {
    const { result } = renderHook(useFullStoryBrowser);
    expect(result.current).toStrictEqual(fullStoryBrowser);
  });
});
