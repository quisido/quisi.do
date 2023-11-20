'use client';

import type { SnippetOptions } from '@fullstory/browser';
import { useEffect } from 'react';
import useShallowMemo from 'use-shallow-memo';
import type IdentifyProps from '../types/identify-props.js';
import useFullStorySdk from './use-fullstory-sdk.js';

export default function useFullStory({
  userUid,
  userVars,
  ...snippetOptions
}: Readonly<IdentifyProps & SnippetOptions>): void {
  const { devMode } = snippetOptions;

  // Contexts
  const { anonymize, identify, init, isInitialized, shutdown } =
    useFullStorySdk();

  // States
  const memoizedSnippetOptions: SnippetOptions = useShallowMemo(snippetOptions);

  // Effects
  useEffect((): void => {
    if (isInitialized()) {
      return;
    }
    init(memoizedSnippetOptions);
  }, [init, isInitialized, memoizedSnippetOptions]);

  useEffect(
    (): VoidFunction => (): void => {
      shutdown();
    },
    [shutdown],
  );

  useEffect((): (() => void) | undefined => {
    if (typeof userUid === 'undefined' || devMode === true) {
      anonymize();
      return;
    }

    identify(userUid.toString(), userVars);
    return (): void => {
      anonymize();
    };
  }, [anonymize, devMode, identify, userUid, userVars]);
}
