import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
  readonly level: 'allow' | 'hidden' | 'mask-user-input' | 'mask';
}

export default function DatadogPrivacy({
  children,
  level,
}: Props): ReactElement {
  return (
    <span className={`dd-privacy-${level}`} data-dd-privacy={level}>
      {children}
    </span>
  );
}
