import type { PropsWithChildren, ReactElement } from 'react';
import OwnsBanner from './owns-banner.jsx';
import OwnsContentInfo from './owns-content-info.jsx';

/**
 * A page should contain at most one banner.
 */
export default function Provider({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <OwnsBanner>
      <OwnsContentInfo>{children}</OwnsContentInfo>
    </OwnsBanner>
  );
}
