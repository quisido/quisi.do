'use client';

import type { SnippetOptions } from '@fullstory/browser';
import { useEffect } from 'react';
import useShallowMemo from 'use-shallow-memo';
import useFullStoryBrowser from './use-fullstory-browser.js';
import type { FSApi } from '@fullstory/snippet';

export default function useFullStory(snippetOptions: Readonly<SnippetOptions>): FSApi {
  // Contexts
  const { FullStory, init, isInitialized } = useFullStoryBrowser();

  // States
  const memoizedSnippetOptions: SnippetOptions = useShallowMemo(snippetOptions);

  // Effects
  useEffect((): void => {
    if (isInitialized()) {
      return;
    }
    init(memoizedSnippetOptions);
  }, [init, isInitialized, memoizedSnippetOptions]);

  return FullStory;
}
