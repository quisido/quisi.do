import { type CSSProperties, type ReactElement } from 'react';

import { type ListItem, type ListProps } from '../core/list-props.js';
import classes from './list.module.scss';

/**
 * A list is a section containing list items.
 * @see {@link https://w3c.github.io/aria/#list | WAI-ARIA `list` role}
 */
export default function List({
  items,
  label,
  labelledBy,
  ordered = false,
}: ListProps): ReactElement {
  const Component = ((): 'ol' | 'ul' => {
    if (ordered) {
      return 'ol';
    }
    return 'ul';
  })();

  return (
    <Component
      aria-label={label}
      aria-labelledby={labelledBy}
      className={classes['list']}
      data-ordered={ordered || undefined}
    >
      {items.map(({ children, key }: ListItem, index: number): ReactElement => (
        <li
          className={classes['list-item']}
          key={key}
          style={{ '--item-index': index } as CSSProperties}
        >
          <span aria-hidden="true" className={classes['marker']}>
            {ordered ? String(index + 1).padStart(2, '0') : ''}
          </span>
          <span className={classes['content']}>{children}</span>
          <span aria-hidden="true" className={classes['confetti']} />
        </li>
      ))}
    </Component>
  );
}
