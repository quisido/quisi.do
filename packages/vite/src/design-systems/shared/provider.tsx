import type { PropsWithChildren, ReactElement } from 'react';
import OwnsBanner from './owns-banner.jsx';

/**
 * A page should contain at most one banner.
 */
export default function Provider({
  children,
}: PropsWithChildren): ReactElement {
  return <OwnsBanner>{children}</OwnsBanner>;
}
