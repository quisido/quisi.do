import type { ReactElement } from 'react';
import type { ListItem, ListProps } from '../core/list-props.js';
import classes from './list.module.scss';

/**
 *   A list is a section containing list items.
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
    >
      {items.map(
        ({ children, key }: ListItem): ReactElement => (
          <li className={classes['list-item']} key={key}>
            {children}
          </li>
        ),
      )}
    </Component>
  );
}
