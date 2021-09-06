import type { SnippetOptions } from '@fullstory/browser';
import { init } from '@fullstory/browser';
import { useEffect } from 'react';

interface Props {
  readonly debug: boolean | undefined;
  readonly devMode: boolean | undefined;
  readonly host: string | undefined;
  readonly namespace: string | undefined;
  readonly orgId: string;
  readonly recordCrossDomainIFrames: boolean | undefined;
  readonly recordOnlyThisIFrame: boolean | undefined;
  readonly script: string | undefined;
}

export default function useFullStory({
  debug,
  devMode,
  host,
  namespace,
  orgId,
  recordCrossDomainIFrames,
  recordOnlyThisIFrame,
  script,
}: Props): void {
  useEffect((): void => {
    const options: SnippetOptions = {
      orgId,
    };

    // This can be simplified when `SnippetOptions` is refactored to support
    //   TypeScript 4.4's `exactOptionalPropertyTypes`.
    // https://github.com/fullstorydev/fullstory-browser-sdk/pull/105
    if (typeof debug !== 'undefined') {
      options.debug = debug;
    }
    if (typeof devMode !== 'undefined') {
      options.devMode = devMode;
    }
    if (typeof host !== 'undefined') {
      options.host = host;
    }
    if (typeof namespace !== 'undefined') {
      options.namespace = namespace;
    }
    if (typeof recordCrossDomainIFrames !== 'undefined') {
      options.recordCrossDomainIFrames = recordCrossDomainIFrames;
    }
    if (typeof recordOnlyThisIFrame !== 'undefined') {
      options.recordOnlyThisIFrame = recordOnlyThisIFrame;
    }
    if (typeof script !== 'undefined') {
      options.script = script;
    }

    init(options);
  }, [
    debug,
    devMode,
    host,
    namespace,
    orgId,
    recordCrossDomainIFrames,
    recordOnlyThisIFrame,
    script,
  ]);
}
