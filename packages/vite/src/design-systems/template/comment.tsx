import type { ReactElement } from 'react';
import type { CommentProps } from '../core/comment-props.js';
import classes from './comment.module.scss';

/**
 * A comment contains content expressing a reaction to other content.
 * Comments can annotate any visible content, from small spans of text, to
 * other comments, to entire articles.
 * If the comment is a reply to another comment, make each reply comment a
 * descendant of the comment to which it is replying. If the ancestor comments
 * are not in the DOM, use the `level`, `positionInSet`, and `setSize` props.
 * If comments relate to other content on the page, set that content's
 * `aria-details` attribute to the comments' IDs or the ID of a parent group or
 * region.
 * @see {@link https://w3c.github.io/aria/#comment | WAI-ARIA `comment` role}
 */
export default function Comment({
  children,
  id,
  label,
  level,
  positionInSet,
  setSize,
}: CommentProps): ReactElement {
  return (
    <div
      aria-label={label}
      aria-level={level}
      aria-posinset={positionInSet}
      aria-setsize={setSize}
      className={classes['comment']}
      id={id}
      role="comment"
    >
      {children}
    </div>
  );
}
