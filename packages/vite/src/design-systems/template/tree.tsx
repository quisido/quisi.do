import type { ReactElement } from 'react';
import classes from './tree.module.scss';
import {
  type TreeGroup,
  type TreeItem,
  type TreeProps,
} from '../core/index.js';

/**
 * A tree is a widget that allows the user to select one or more items from a
 * hierarchically organized collection.
 * @see {@link https://w3c.github.io/aria/#tree | WAI-ARIA `tree` role}
 * @see {@link https://w3c.github.io/aria/#treeitem | WAI-ARIA `treeitem` role}
 */
export default function Tree({
  items,
  orientation = 'vertical',
  required = false,
}: TreeProps): ReactElement {
  return (
    <div
      aria-orientation={orientation}
      aria-required={required}
      className={classes['tree']}
      role="tree"
    >
      {items.map(
        ({ key: groupKey, ...group }: TreeGroup | TreeItem): ReactElement => {
          if ('items' in group) {
            return (
              <div className={classes['group']} key={groupKey} role="group">
                {group.items.map(
                  ({ content, key: itemKey }: TreeItem): ReactElement => (
                    <div
                      className={classes['item']}
                      key={itemKey}
                      role="treeitem"
                    >
                      {content}
                    </div>
                  ),
                )}
              </div>
            );
          }

          return (
            <div className={classes['item']} key={groupKey} role="treeitem">
              {group.content}
            </div>
          );
        },
      )}
    </div>
  );
}
