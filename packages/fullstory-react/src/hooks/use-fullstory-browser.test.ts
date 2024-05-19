import * as fullStoryBrowser from '@fullstory/browser';
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useFullStoryBrowser from './use-fullstory-browser.js';

describe('useFullStoryBrowser', (): void => {
  it('should return the FullStory browser API by default', (): void => {
    const { result } = renderHook(useFullStoryBrowser);
    expect(result.current).toStrictEqual(fullStoryBrowser);
  });
});
