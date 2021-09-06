import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

export default function FullStoryUnmask({ children }: Props): ReactElement {
  return <span className="fs-unmask">{children}</span>;
}
