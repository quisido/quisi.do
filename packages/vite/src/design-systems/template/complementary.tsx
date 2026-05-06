import type { ReactElement } from 'react';
import type { ComplementaryProps } from '../core/complementary-props.js';
import classes from './complementary.module.scss';

/**
 * A complementary landmark designates complements the main content to which
 * it is a sibling or of which it is a direct descendant. The contents of a
 * complementary landmark would be expected to remain meaningful if it were to
 * be separated from the main content to which it is relevant.
 * Complementary landmarks apply to various types of content. For example, in
 * the case of a portal, this can include but not be limited to show times,
 * current weather, related articles, or stocks to watch. If the complementary
 * content is completely separable from the main content, it might be
 * appropriate to use a more general role.
 */
export default function Complementary({
  children,
}: ComplementaryProps): ReactElement {
  return <aside className={classes['complementary']}>{children}</aside>;
}
