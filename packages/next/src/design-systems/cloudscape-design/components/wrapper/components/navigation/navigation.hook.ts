import { type NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import { type SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import { useCallback, useMemo } from 'react';
import { useSideNavigation } from 'use-next-awsui';
import filterSideNavigationItemsByExpandable from '../../utils/filter-side-navigation-items-by-expandable';
import filterSideNavigationItemsByHasItems from '../../utils/filter-side-navigation-items-by-has-items';
import mapTranslationFunctionToSideNavigationItems from '../../utils/map-translation-function-to-side-navigation-items';
import mapItemsToHrefs from '../../utils/map-items-to-hrefs';

interface State {
  readonly activeHref: string;
  readonly items: readonly SideNavigationProps.Item[];
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<SideNavigationProps.ChangeDetail>>
    >,
  ) => void;
  readonly handleFollow: (
    event: Readonly<CustomEvent<Readonly<SideNavigationProps.FollowDetail>>>,
  ) => void;
}

const EXPANDED: Map<string, boolean> = new Map();

const mapIndexPrefixToItemToExpandedMapper = (
  indexPrefix: string,
): ((
  item: SideNavigationProps.Item,
  index: number,
) => SideNavigationProps.Item) => {
  const mapIndexToId = (index: number): string => {
    if (indexPrefix === '') {
      return index.toString();
    }
    return `${indexPrefix}.${index}`;
  };

  return function mapItemToExpanded(
    item: SideNavigationProps.Item,
    index: number,
  ): SideNavigationProps.Item {
    const id: string = mapIndexToId(index);
    const newItem: SideNavigationProps.Item = { ...item };

    // If this item is expandable, check for an expanded state.
    if (filterSideNavigationItemsByExpandable(newItem)) {
      const newDefaultExpanded: boolean | undefined = EXPANDED.get(id);
      if (typeof newDefaultExpanded === 'boolean') {
        newItem.defaultExpanded = newDefaultExpanded;
      }
    }

    // If this item has children, check them for expanded state.
    if (filterSideNavigationItemsByHasItems(newItem)) {
      const mapSubItemToExpanded = mapIndexPrefixToItemToExpandedMapper(id);
      const newSubItems: SideNavigationProps.Item[] =
        newItem.items.map(mapSubItemToExpanded);
      newItem.items = newSubItems;
    }
    return newItem;
  };
};

const mapItemToExpanded = mapIndexPrefixToItemToExpandedMapper('');

export default function useCloudscapeDesignWrapperNavigation(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const items: SideNavigationProps.Item[] =
    useMemo((): SideNavigationProps.Item[] => {
      const sideNavigationItems: readonly SideNavigationProps.Item[] =
        mapTranslationFunctionToSideNavigationItems(translate);
      return sideNavigationItems.map(mapItemToExpanded);
    }, [translate]);

  const hrefs: ReadonlySet<string> = useMemo(
    (): ReadonlySet<string> => mapItemsToHrefs(items),
    [items],
  );

  const { activeHref, handleFollow } = useSideNavigation({
    hrefs,
  });

  return {
    activeHref,
    handleFollow,
    items,

    handleChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<SideNavigationProps.ChangeDetail>>
        >,
      ): void => {
        let id = '';
        let itemsPointer: readonly SideNavigationProps.Item[] = items;
        for (const item of [...e.detail.expandableParents, e.detail.item]) {
          const findItem = (i: SideNavigationProps.Item): boolean => i === item;
          const itemIndex: number = itemsPointer.findIndex(findItem);
          if (id === '') {
            id = itemIndex.toString();
          } else {
            id = `${id}.${itemIndex}`;
          }
          itemsPointer = item.items;
        }
        EXPANDED.set(id, e.detail.expanded);
      },
      [items],
    ),
  };
}
