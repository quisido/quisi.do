import type { PropsWithChildren, ReactElement } from 'react';

interface Props {
  readonly className?: string | undefined;
}

export default function CloudscapeDesignContainerContents({
  children,
  className,
}: Readonly<PropsWithChildren<Props>>): ReactElement {
  if (typeof className === 'undefined') {
    return <>{children}</>;
  }

  return <div className={className}>{children}</div>;
}
