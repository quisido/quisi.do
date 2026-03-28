import type { ReactElement } from 'react';
import type { DashboardLayoutProps } from '../shared/dashboard-layout-props.js';
import Banner from '../template/banner.js';
import Main from '../template/main.js';
import Navigation from '../template/navigation.js';

/**
 *   The `DashboardLayout` is a high-level overview page featuring a side
 * navigation bar, an optional top banner, and a main content area for data
 * cards or widgets.
 *   The navigation landmark communicates the sidebar purpose to assistive
 * technologies, while the main landmark contains the primary dashboard content.
 */
export default function DashboardLayout({
  banner,
  children,
  label,
  navigation,
  navigationLabel,
}: DashboardLayoutProps): ReactElement {
  return (
    <>
      {banner !== undefined && <Banner>{banner}</Banner>}
      <Navigation label={navigationLabel}>{navigation}</Navigation>
      <Main label={label}>{children}</Main>
    </>
  );
}
