'use client';

import type { SnippetOptions } from '@fullstory/browser';
import { useEffect, type PropsWithChildren, type ReactElement } from 'react';
import useShallowMemo from 'use-shallow-memo';
import FullstoryContext from '../contexts/fullstory.js';
import useFullstoryBrowser from '../hooks/use-fullstory-browser.js';

interface Props extends SnippetOptions {
  readonly identityProperties?: object | undefined;
  readonly identityUid?: string | undefined;
}

function useFullstoryEffects({
  identityProperties,
  identityUid,
  ...snippetOptions
}: Props): void {
  // Contexts
  const {
    FullStory: fullstoryApi,
    init,
    isInitialized,
  } = useFullstoryBrowser();

  // States
  const memoizedSnippetOptions: SnippetOptions = useShallowMemo(snippetOptions);

  // Effects
  useEffect((): VoidFunction | undefined => {
    if (isInitialized()) {
      return;
    }

    init(memoizedSnippetOptions);
    return (): void => {
      fullstoryApi('shutdown');
    };
  }, [fullstoryApi, init, isInitialized, memoizedSnippetOptions]);

  useEffect((): void => {
    if (
      typeof identityProperties === 'undefined' &&
      typeof identityUid === 'undefined'
    ) {
      fullstoryApi('setIdentity', {
        anonymous: true,
        consent: false,
      });
      return;
    }

    fullstoryApi('setIdentity', {
      anonymous: false,
      consent: false,
      properties: identityProperties,
      uid: identityUid,
    });
  }, [fullstoryApi, identityProperties, identityUid]);
}

export default function Fullstory({
  children,
  ...props
}: PropsWithChildren<Props>): ReactElement {
  // Contexts
  const { FullStory: fullstoryApi } = useFullstoryBrowser();

  // Effects
  useFullstoryEffects(props);

  return (
    <FullstoryContext.Provider value={fullstoryApi}>
      {children}
    </FullstoryContext.Provider>
  );
}
