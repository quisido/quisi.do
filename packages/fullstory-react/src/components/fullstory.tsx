'use client';

import type { SnippetOptions } from '@fullstory/browser';
import { useEffect, type PropsWithChildren, type ReactElement } from 'react';
import useShallowMemo from 'use-shallow-memo';
import FullstoryContext from '../contexts/fullstory.js';
import useFullStoryBrowser from '../hooks/use-fullstory-browser.js';

interface Authenticated {
  readonly identity: object;
  readonly identityUid: string;
}

interface Unauthenticated {
  readonly identity?: undefined;
  readonly identityUid?: undefined;
}

type Props = SnippetOptions & (Authenticated | Unauthenticated);

function useFullstoryEffects({
  identity,
  identityUid,
  ...snippetOptions
}: Props): void {
  // Contexts
  const {
    FullStory: fullStoryApi,
    init,
    isInitialized,
  } = useFullStoryBrowser();

  // States
  const memoizedSnippetOptions: SnippetOptions = useShallowMemo(snippetOptions);

  // Effects
  useEffect((): VoidFunction | undefined => {
    if (isInitialized()) {
      return;
    }

    init(memoizedSnippetOptions);
    return (): void => {
      fullStoryApi('shutdown');
    };
  }, [fullStoryApi, init, isInitialized, memoizedSnippetOptions]);

  useEffect((): void => {
    if (typeof identity === 'undefined') {
      fullStoryApi('setIdentity', {
        anonymous: true,
        consent: false,
      });
      return;
    }

    fullStoryApi('setIdentity', {
      anonymous: false,
      consent: false,
      properties: identity,
      uid: identityUid,
    });
  }, [fullStoryApi, identity, identityUid]);
}

export default function Fullstory({
  children,
  ...props
}: PropsWithChildren<Props>): ReactElement {
  // Contexts
  const { FullStory: fullStoryApi } = useFullStoryBrowser();

  // Effects
  useFullstoryEffects(props);

  return (
    <FullstoryContext.Provider value={fullStoryApi}>
      {children}
    </FullstoryContext.Provider>
  );
}
