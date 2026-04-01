import type { ReactElement } from 'react';
import type { TreeGridProps } from '../shared/tree-grid-props.js';

/**
 *   A `TreeGrid` component is a `Grid` whose rows can be expanded and
 * collapsed in the same manner as a `Tree`.
 */
export default function TreeGrid({
  caption,
  children,
}: TreeGridProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <table role="treegrid">
      <caption>{caption}</caption>
      {children}
    </table>
  );
}
