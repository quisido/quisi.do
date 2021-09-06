import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

export default function FullStoryExclude({ children }: Props): ReactElement {
  return <span className="fs-exclude">{children}</span>;
}
