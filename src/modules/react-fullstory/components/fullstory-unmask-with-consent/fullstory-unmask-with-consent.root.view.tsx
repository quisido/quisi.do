import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

export default function FullStoryUnmaskWithConsent({
  children,
}: Props): ReactElement {
  return <span className="fs-unmask-with-consent">{children}</span>;
}
