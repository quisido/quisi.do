import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useCallback, useMemo } from 'react';
import { useSideNavigation } from 'use-awsui-router';
import filterSideNavigationItemsByExpandable from '../../utils/filter-side-navigation-items-by-expandable';
import filterSideNavigationItemsByHasItems from '../../utils/filter-side-navigation-items-by-has-items';
import mapTranslationFunctionToAwsSideNavigationItems from '../../utils/map-translation-function-to-aws-side-navigation-items';

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

export default function useAwsWrapperNavigation(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const { activeHref, handleFollow } = useSideNavigation();

  const items: SideNavigationProps.Item[] =
    useMemo((): SideNavigationProps.Item[] => {
      const sideNavigationItems: readonly SideNavigationProps.Item[] =
        mapTranslationFunctionToAwsSideNavigationItems(translate);
      return sideNavigationItems.map(mapItemToExpanded);
    }, [translate]);

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
