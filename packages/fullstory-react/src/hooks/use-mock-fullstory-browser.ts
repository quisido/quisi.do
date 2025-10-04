import type * as fullstoryBrowser from '@fullstory/browser';
import { FullStory as FullStoryBrowserFSApi } from '@fullstory/browser';
import type { ApiV1, FSApi } from '@fullstory/snippet';
import { useCallback, useMemo, useState } from 'react';
import useShallowMemo from 'use-shallow-memo';
import merge from '../utils/merge.js';

export default function useMockFullstoryBrowser(
  partial: Partial<Omit<typeof fullstoryBrowser, 'default'>>,
): Omit<typeof fullstoryBrowser, 'default'> {
  // States
  const [initialized, setInitialized] = useState(false);

  const FullStory = useMemo((): FSApi => {
    return merge(
      function MockFullstory(...args: Parameters<FSApi>) {
        if (typeof partial.FullStory === 'undefined') {
          return;
        }

        partial.FullStory.apply(FullStory, args);
      } as Omit<FSApi, keyof ApiV1>,
      FullStoryBrowserFSApi,
    );
  }, [partial.FullStory]);

  // Callbacks
  const init = useCallback((): void => {
    setInitialized(true);
  }, []);

  const isInitialized = useCallback((): boolean => initialized, [initialized]);

  return useShallowMemo({
    FullStory,
    init,
    ...partial,
    isInitialized,
  });
}
