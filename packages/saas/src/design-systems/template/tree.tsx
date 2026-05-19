import {
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import classes from './tree.module.scss';
import {
  type TreeGroup,
  type TreeItem,
  type TreeItemKey,
  type TreeProps,
} from '../core/index.js';

interface VisibleTreeItem {
  readonly item: TreeGroup | TreeItem;
  readonly parentKey?: TreeItemKey | undefined;
}

const getAccessibleName = ({
  content,
  label,
}: TreeGroup | TreeItem): string | undefined => {
  if (label !== undefined) {
    return label;
  }

  if (typeof content === 'string' || typeof content === 'number') {
    return String(content);
  }

  return undefined;
};

const getFirstItemKey = (
  items: readonly (TreeGroup | TreeItem)[],
): TreeItemKey | undefined => {
  return items[0]?.key;
};

const hasChildItems = (item: TreeGroup | TreeItem): item is TreeGroup => {
  return 'items' in item && item.items.length > 0;
};

const reduceItemsToVisibleItems = (
  items: readonly (TreeGroup | TreeItem)[],
  parentKey?: TreeItemKey,
): VisibleTreeItem[] => {
  const visibleItems: VisibleTreeItem[] = [];

  for (const item of items) {
    visibleItems.push({ item, parentKey });

    if (hasChildItems(item) && item.expanded !== false) {
      visibleItems.push(...reduceItemsToVisibleItems(item.items, item.key));
    }
  }

  return visibleItems;
};

/**
 * A tree is a widget that allows the user to select one or more items from a
 * hierarchically organized collection.
 * @see {@link https://w3c.github.io/aria/#tree | WAI-ARIA `tree` role}
 * @see {@link https://w3c.github.io/aria/#treeitem | WAI-ARIA `treeitem` role}
 */
export default function Tree({
  items,
  label,
  labelledBy,
  multiselectable = false,
  onSelect,
  onToggle,
  orientation = 'vertical',
  required = false,
}: TreeProps): ReactElement {
  const itemRefs = useRef(new Map<TreeItemKey, HTMLDivElement>());
  const [activeKey, setActiveKey] = useState<TreeItemKey | undefined>(
    getFirstItemKey(items),
  );

  const visibleItems: VisibleTreeItem[] = reduceItemsToVisibleItems(items);
  const effectiveActiveKey: TreeItemKey | undefined =
    activeKey ?? getFirstItemKey(items);

  const focusItem = (key: TreeItemKey): void => {
    setActiveKey(key);
    itemRefs.current.get(key)?.focus();
  };

  const focusItemAtOffset = (
    item: TreeGroup | TreeItem,
    offset: number,
  ): void => {
    const itemIndex: number = visibleItems.findIndex(
      ({ item: visibleItem }: VisibleTreeItem): boolean =>
        visibleItem.key === item.key,
    );
    const nextItem: VisibleTreeItem | undefined =
      visibleItems[itemIndex + offset];

    if (nextItem !== undefined) {
      focusItem(nextItem.item.key);
    }
  };

  const handleKeyDown = (
    item: TreeGroup | TreeItem,
    parentKey: TreeItemKey | undefined,
    event: KeyboardEvent<HTMLDivElement>,
  ): void => {
    event.stopPropagation();

    switch (event.key) {
      case ' ': {
        event.preventDefault();
        onSelect?.(item.key);
        break;
      }

      case 'ArrowDown': {
        event.preventDefault();
        focusItemAtOffset(item, 1);
        break;
      }

      case 'ArrowLeft': {
        if (hasChildItems(item) && item.expanded !== false) {
          event.preventDefault();
          onToggle?.(item.key);
          return;
        }

        if (parentKey !== undefined) {
          event.preventDefault();
          focusItem(parentKey);
        }
        break;
      }

      case 'ArrowRight': {
        if (!hasChildItems(item)) {
          break;
        }

        event.preventDefault();

        if (item.expanded === false) {
          onToggle?.(item.key);
          return;
        }

        focusItemAtOffset(item, 1);
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        focusItemAtOffset(item, -1);
        break;
      }

      case 'End': {
        const lastItem: VisibleTreeItem | undefined =
          visibleItems[visibleItems.length - 1];

        if (lastItem !== undefined) {
          event.preventDefault();
          focusItem(lastItem.item.key);
        }
        break;
      }

      case 'Enter': {
        event.preventDefault();
        onSelect?.(item.key);
        break;
      }

      case 'Home': {
        const firstItem: VisibleTreeItem | undefined = visibleItems[0];

        if (firstItem !== undefined) {
          event.preventDefault();
          focusItem(firstItem.item.key);
        }
        break;
      }
    }
  };

  const renderTreeItem = (
    item: TreeGroup | TreeItem,
    parentKey?: TreeItemKey,
  ): ReactElement => {
    const { childItems, isExpanded } = (():
      | {
          readonly childItems: readonly TreeItem[];
          readonly isExpanded: boolean;
        }
      | {
          readonly childItems: undefined;
          readonly isExpanded: true;
        } => {
      if (hasChildItems(item)) {
        return {
          childItems: item.items,
          isExpanded: item.expanded !== false,
        };
      }

      return {
        childItems: undefined,
        isExpanded: true,
      };
    })();

    return (
      <div
        aria-checked={item.checked}
        aria-expanded={((): boolean | undefined => {
          if (childItems === undefined) {
            return;
          }
          return isExpanded;
        })()}
        aria-label={getAccessibleName(item)}
        aria-selected={item.selected}
        className={classes['item']}
        key={item.key}
        onFocus={(): void => {
          setActiveKey(item.key);
        }}
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>): void => {
          handleKeyDown(item, parentKey, event);
        }}
        ref={(element: HTMLDivElement | null): void => {
          if (element === null) {
            itemRefs.current.delete(item.key);
            return;
          }

          itemRefs.current.set(item.key, element);
        }}
        role="treeitem"
        tabIndex={((): -1 | 0 => {
          if (item.key === effectiveActiveKey) {
            return 0;
          }
          return -1;
        })()}
      >
        {item.content}
        {childItems !== undefined && isExpanded && (
          <div className={classes['group']} role="group">
            {childItems.map(
              (childItem: TreeItem): ReactElement =>
                renderTreeItem(childItem, item.key),
            )}
          </div>
        )}
      </div>
    );
  };

  const children: ReactNode = items.map(
    (item: TreeGroup | TreeItem): ReactElement => renderTreeItem(item),
  );

  return (
    <div
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-multiselectable={multiselectable}
      aria-orientation={orientation}
      aria-required={required}
      className={classes['tree']}
      role="tree"
    >
      {children}
    </div>
  );
}
