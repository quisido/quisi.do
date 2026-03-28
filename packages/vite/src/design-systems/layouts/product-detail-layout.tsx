import type { ReactElement } from 'react';
import type { ProductDetailLayoutProps } from '../shared/product-detail-layout-props.js';
import Complementary from '../template/complementary.js';
import Main from '../template/main.js';
import Region from '../template/region.js';

/**
 *   The `ProductDetailLayout` is the standard e-commerce or SaaS feature page.
 * It features a media gallery alongside product information and purchase
 * actions.
 *   The media section is rendered as a labeled region, while the product
 * information is rendered as complementary content that remains meaningful when
 * separated from the media.
 */
export default function ProductDetailLayout({
  children,
  label,
  media,
}: ProductDetailLayoutProps): ReactElement {
  return (
    <Main label={label}>
      <Region label="Media">{media}</Region>
      <Complementary>{children}</Complementary>
    </Main>
  );
}
