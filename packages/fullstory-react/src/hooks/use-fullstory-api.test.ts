/// <reference types="jest" />
import * as fullStoryBrowser from '@fullstory/browser';
import { renderHook } from '@testing-library/react';
import useFullStorySdk from './use-fullstory-sdk.js';

describe('useFullStorySdk', (): void => {
  it('should return the FullStory browser API by default', (): void => {
    const { result } = renderHook(useFullStorySdk);
    expect(result.current).toStrictEqual(fullStoryBrowser);
  });
});
