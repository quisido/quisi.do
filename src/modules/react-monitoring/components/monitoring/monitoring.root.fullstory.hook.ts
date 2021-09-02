import type { SnippetOptions } from '@fullstory/browser';
import { init } from '@fullstory/browser';
import { useEffect } from 'react';

interface Props {
  readonly debug: boolean | undefined;
  readonly devMode: boolean | undefined;
  readonly host: string | undefined;
  readonly namespace: string | undefined;
  readonly orgId: string | undefined;
  readonly recordCrossDomainIFrames: boolean | undefined;
  readonly recordOnlyThisIFrame: boolean | undefined;
  readonly script: string | undefined;
}

export default function useMonitoringFullStory({
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
    if (typeof orgId === 'undefined') {
      return;
    }

    const options: SnippetOptions = {
      orgId,
    };

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
