import type { ReactNode } from 'react';

export interface CommentProps {
  readonly children: ReactNode;
  readonly id?: string | undefined;
  readonly label: string;
  /**
   *   If all ancestor comments are not in the DOM, such as when comments are
   * paginated, the level indicates hierarchy.
   */
  readonly level?: number | undefined;
  /**
   *   If all ancestor comments are not in the DOM, such as when comments are
   * paginated, the position-in-set indicates the comment's position within its
   * group.
   */
  readonly positionInSet?: number | undefined;
  /**
   *   If all ancestor comments are not in the DOM, such as when comments are
   * paginated, the set size indicates the total number of comments in the
   * group.
   */
  readonly setSize?: number | undefined;
}
