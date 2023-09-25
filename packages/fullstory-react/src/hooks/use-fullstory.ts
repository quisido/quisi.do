'use client';

import type { SnippetOptions } from '@fullstory/browser';
import { useEffect, type MutableRefObject, useRef } from 'react';
import type IdentifyProps from '../types/identify-props.js';
import useFullStoryAPI from './use-fullstory-api.js';
import useShallowMemo from './use-shallow-memo.js';

export default function useFullStory({
  userUid,
  userVars,
  ...snippetOptions
}: Readonly<IdentifyProps & SnippetOptions>): void {
  const { devMode } = snippetOptions;

  // Contexts
  const { anonymize, identify, init, shutdown } = useFullStoryAPI();

  // States
  const memoizedSnippetOptions: SnippetOptions = useShallowMemo(snippetOptions);
  const snippetOptionsRef: MutableRefObject<SnippetOptions | null> =
    useRef(null);

  // Effects
  useEffect((): (() => void) | undefined => {
    // React fires effect hooks twice in development mode.
    // If we've already initiated, don't do it a second time.
    if (snippetOptionsRef.current === memoizedSnippetOptions) {
      return;
    }

    snippetOptionsRef.current = memoizedSnippetOptions;
    init(memoizedSnippetOptions);

    return (): void => {
      shutdown();
    };
  }, [memoizedSnippetOptions]);

  useEffect((): (() => void) | undefined => {
    if (typeof userUid === 'undefined' || devMode === true) {
      anonymize();
      return;
    }

    identify(userUid.toString(), userVars);
    return (): void => {
      anonymize();
    };
  }, [devMode, userUid, userVars]);
}
