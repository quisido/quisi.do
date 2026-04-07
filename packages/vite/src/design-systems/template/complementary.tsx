import type { ReactElement } from 'react';
import type { ComplementaryProps } from '../core/complementary-props.js';

/**
 *   A `Complementary` component is a landmark that is designed be complementary
 * to the main content that it is a sibling to, or a direct descendant of. The
 * contents of a complementary landmark would be expected to remain meaningful
 * if it were to be separated from the main content it is relevant to.
 *   Complementary landmarks apply to various types of content. For example, in
 * the case of a portal, this can include but not be limited to show times,
 * current weather, related articles, or stocks to watch. If the complementary
 * content is completely separable from the main content, it might be
 * appropriate to use a more general role.
 */
export default function Complementary({
  children,
}: ComplementaryProps): ReactElement {
  return <aside>{children}</aside>;
}
