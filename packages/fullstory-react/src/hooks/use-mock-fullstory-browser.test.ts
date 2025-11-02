import type { ApiV2 } from '@fullstory/snippet';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useMockFullstoryBrowser from './use-mock-fullstory-browser.js';

const TEST_FULL_STORY = vi.fn();

describe('useMockFullstoryBrowser', (): void => {
  describe('FullStory', (): void => {
    it('should default to no-op', (): void => {
      const { result } = renderHook(useMockFullstoryBrowser);

      const { FullStory: fullStory } = result.current;

      expect((): void => {
        fullStory('init');
      }).not.toThrow();
    });

    it('should call a provided Fullstory API', (): void => {
      const { result } = renderHook(useMockFullstoryBrowser, {
        initialProps: {
          FullStory: TEST_FULL_STORY as unknown as ApiV2,
        },
      });

      const { FullStory: fullStory } = result.current;
      fullStory('init');

      expect(TEST_FULL_STORY).toHaveBeenCalledWith('init');
    });
  });
});
