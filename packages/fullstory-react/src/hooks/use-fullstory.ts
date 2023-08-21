import type { SnippetOptions } from '@fullstory/browser';
import { useEffect } from 'react';
import type IdentifyProps from '../types/identify-props';
import useFullStoryAPI from './use-fullstory-api';
import useShallowMemo from './use-shallow-memo';

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

  // Effects
  useEffect((): VoidFunction => {
    init(memoizedSnippetOptions);

    return (): void => {
      shutdown();
    };
  }, [memoizedSnippetOptions]);

  useEffect((): VoidFunction | undefined => {
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
