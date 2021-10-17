import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useCallback, useMemo } from 'react';
import Capsule, { useCapsule } from 'react-capsule';
import { useSideNavigation } from 'use-awsui-router';
import filterSideNavigationItemsByExpandable from './utils/filter-side-navigation-items-by-expandable';
import filterSideNavigationItemsByHasItems from './utils/filter-side-navigation-items-by-has-items';
import mapTranslationFunctionToAwsSideNavigationItems from './utils/map-translation-function-to-aws-side-navigation-items';

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

const expandedMapCapsule: Capsule<Map<string, boolean>> = new Capsule(
  new Map<string, boolean>(),
);

export default function useNavigation(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const [expandedMap, setExpandedMap] = useCapsule(expandedMapCapsule);
  const { activeHref, handleFollow } = useSideNavigation();

  // TODO: Use nested indices, e.g. `5.0.1.3`, instead of text, since text is
  //   subject to change on translation.
  const recursiveExpand = useCallback(
    (item: SideNavigationProps.Item): SideNavigationProps.Item => {
      const newItem: SideNavigationProps.Item = { ...item };
      if (
        filterSideNavigationItemsByExpandable(newItem) &&
        expandedMap.has(newItem.text)
      ) {
        const newDefaultExpanded: boolean | undefined = expandedMap.get(
          newItem.text,
        );
        if (typeof newDefaultExpanded === 'boolean') {
          newItem.defaultExpanded = newDefaultExpanded;
        }
      }
      if (filterSideNavigationItemsByHasItems(newItem)) {
        const newSubItems: SideNavigationProps.Item[] = [];
        for (const subItem of newItem.items) {
          const newSubItem: SideNavigationProps.Item = recursiveExpand(subItem);
          newSubItems.push(newSubItem);
        }
        newItem.items = newSubItems;
      }
      return newItem;
    },
    [expandedMap],
  );

  return {
    activeHref,
    handleFollow,

    handleChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<SideNavigationProps.ChangeDetail>>
        >,
      ): void => {
        setExpandedMap(
          (
            oldExpandedMap: Readonly<Map<string, boolean>>,
          ): Map<string, boolean> => {
            const newExpandedMap: Map<string, boolean> = new Map(
              oldExpandedMap,
            );
            newExpandedMap.set(e.detail.item.text, e.detail.expanded);
            return newExpandedMap;
          },
        );
      },
      [setExpandedMap],
    ),

    items: useMemo(
      (): SideNavigationProps.Item[] =>
        mapTranslationFunctionToAwsSideNavigationItems(translate).map(
          recursiveExpand,
        ),
      [recursiveExpand, translate],
    ),
  };
}
