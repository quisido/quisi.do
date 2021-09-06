import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

export default function FullStoryMaskWithoutConsent({
  children,
}: Props): ReactElement {
  return <span className="fs-mask-without-consent">{children}</span>;
}
