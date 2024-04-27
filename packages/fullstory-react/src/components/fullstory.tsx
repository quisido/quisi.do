'use client';

import type { SnippetOptions } from '@fullstory/browser';
import { useEffect, type PropsWithChildren, type ReactElement } from 'react';
import useShallowMemo from 'use-shallow-memo';
import FullstoryContext from '../contexts/fullstory.js';
import useFullStoryBrowser from '../hooks/use-fullstory-browser.js';

export default function Fullstory({
  children,
  ...snippetOptions
}: PropsWithChildren<SnippetOptions>): ReactElement {
  // Contexts
  const { FullStory, init, isInitialized } = useFullStoryBrowser();

  // States
  const memoizedSnippetOptions: SnippetOptions = useShallowMemo(snippetOptions);

  // Effects
  useEffect((): VoidFunction | undefined => {
    if (isInitialized()) {
      return;
    }

    init(memoizedSnippetOptions);
    return (): void => {
      FullStory('shutdown');
    };
  }, [FullStory, init, isInitialized, memoizedSnippetOptions]);

  return (
    <FullstoryContext.Provider value={FullStory}>
      {children}
    </FullstoryContext.Provider>
  );
}
