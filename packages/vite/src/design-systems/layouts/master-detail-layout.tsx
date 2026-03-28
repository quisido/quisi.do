import type { ReactElement } from 'react';
import type { MasterDetailLayoutProps } from '../shared/master-detail-layout-props.js';
import Main from '../template/main.js';
import Navigation from '../template/navigation.js';

/**
 *   The `MasterDetailLayout` is a split-view layout commonly used for email
 * clients, file browsers, and chat applications. It features a master list of
 * selectable items on one side and a detail pane on the other.
 *   The master list is rendered as a navigation landmark, allowing assistive
 * technologies to identify it as a navigable area, while the detail pane is
 * rendered as the main content area.
 */
export default function MasterDetailLayout({
  children,
  label,
  master,
  masterLabel,
}: MasterDetailLayoutProps): ReactElement {
  return (
    <>
      <Navigation label={masterLabel}>{master}</Navigation>
      <Main label={label}>{children}</Main>
    </>
  );
}
