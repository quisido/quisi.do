import type { ReactElement, ReactNode } from 'react';

export interface MarqueeProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Marquee({
  children,
  label,
}: MarqueeProps): ReactElement {
  return (
    <div aria-label={label} role="marquee">
      {children}
    </div>
  );
}
