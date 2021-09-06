import type { ReactElement, ReactNode } from 'react';
import useFullStory from './fullstory.root.hook';

interface Props {
  readonly children: ReactNode;
  readonly debug?: boolean | undefined;
  readonly devMode?: boolean | undefined;
  readonly host?: string | undefined;
  readonly namespace?: string | undefined;
  readonly orgId: string;
  readonly recordCrossDomainIFrames?: boolean | undefined;
  readonly recordOnlyThisIFrame?: boolean | undefined;
  readonly script?: string | undefined;
}

export default function FullStory({
  children,
  debug,
  devMode,
  host,
  namespace,
  orgId,
  recordCrossDomainIFrames,
  recordOnlyThisIFrame,
  script,
}: Props): ReactElement {
  useFullStory({
    debug,
    devMode,
    host,
    namespace,
    orgId,
    recordCrossDomainIFrames,
    recordOnlyThisIFrame,
    script,
  });

  return <>{children}</>;
}
