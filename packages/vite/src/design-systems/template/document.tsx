import type { ReactElement, ReactNode } from 'react';
import OwnsBanner from '../shared/owns-banner.js';
import Banner from './banner.js';

export interface DocumentProps {
  readonly banner?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly label?: string | undefined;
}

/**
 *   A `Document` component contains content that assistive technology users may
 * want to browse in a reading mode. It is most useful as a focusable child of
 * an `Application` or other widget context.
 */
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
