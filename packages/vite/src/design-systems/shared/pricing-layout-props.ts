import type { ReactNode } from 'react';

export interface PricingLayoutProps {
  /** Pricing tier cards or pricing grid. */
  readonly children: ReactNode;
  /** Frequently asked questions section. */
  readonly faq?: ReactNode | undefined;
  /** Introductory header content above the pricing grid. */
  readonly header?: ReactNode | undefined;
  /** Accessible label for the main content area. */
  readonly label: string;
}
