import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

export default function FullStoryExcludeWithoutConsent({
  children,
}: Props): ReactElement {
  return <span className="fs-exclude-without-consent">{children}</span>;
}
