import * as fullstoryBrowser from '@fullstory/browser';
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useFullstoryBrowser from './use-fullstory-browser.js';

describe('useFullstoryBrowser', (): void => {
  it('should return the Fullstory browser API by default', (): void => {
    const { result } = renderHook(useFullstoryBrowser);
    expect(result.current).toStrictEqual(fullstoryBrowser);
  });
});
