import type { ReactElement } from 'react';
import type { PricingLayoutProps } from '../shared/pricing-layout-props.js';
import Main from '../template/main.js';
import Region from '../template/region.js';

/**
 *   The `PricingLayout` is centered around a pricing grid or tier cards. It
 * optionally includes introductory header content and a frequently asked
 * questions section.
 *   This layout is typically used for SaaS pricing pages, subscription tier
 * comparisons, and plan selection interfaces.
 */
export default function PricingLayout({
  children,
  faq,
  header,
  label,
}: PricingLayoutProps): ReactElement {
  return (
    <Main label={label}>
      {header !== undefined && <Region label="Overview">{header}</Region>}
      {children}
      {faq !== undefined && (
        <Region label="Frequently asked questions">{faq}</Region>
      )}
    </Main>
  );
}
