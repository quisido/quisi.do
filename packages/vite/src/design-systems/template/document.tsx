import type { ReactElement, ReactNode } from 'react';
import OwnsBanner from '../shared/owns-banner.js';
import Banner from './banner.js';

export interface DocumentProps {
  readonly banner?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly label?: string | undefined;
}

export default function Document({
  banner,
  children,
  label,
}: DocumentProps): ReactElement {
  return (
    <div aria-label={label} role="document">
      <OwnsBanner>
        {banner !== undefined && <Banner>{banner}</Banner>}
        {children}
      </OwnsBanner>
    </div>
  );
}
