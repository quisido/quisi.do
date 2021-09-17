import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
  readonly level: 'allow' | 'hidden' | 'mask' | 'mask-user-input';
}

export default function DataDogPrivacy({
  children,
  level,
}: Props): ReactElement {
  return (
    <span className={`dd-privacy-${level}`} data-dd-privacy={level}>
      {children}
    </span>
  );
}
