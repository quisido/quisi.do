import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

export default function FullStoryMask({ children }: Props): ReactElement {
  return <span className="fs-mask">{children}</span>;
}
