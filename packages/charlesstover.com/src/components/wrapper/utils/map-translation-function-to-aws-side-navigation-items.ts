import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import type { TranslateFunction } from 'lazy-i18n';
import filterByUndefined from '../../../utils/filter-by-undefined';
import mapComponentToElement from '../../../utils/map-component-to-element';
import NAVIGATION_ITEMS from '../constants/navigation-items';
import type NavigationText from '../constants/navigation-text';
import type NavigationCategory from '../types/navigation-category';
import type NavigationComponent from '../types/navigation-component';
import type NavigationExternalLink from '../types/navigation-external-link';
import type NavigationLink from '../types/navigation-link';
import filterByNavigationCategory from '../utils/filter-by-navigation-category';
import filterByNavigationComponent from '../utils/filter-by-navigation-component';
import filterByNavigationExternalLink from '../utils/filter-by-navigation-external-link';
import mapTranslateFunctionToNavigationTextTranslator from '../utils/map-translate-function-to-navigation-text-translator';

export default function mapTranslationFunctionToAwsSideNavigationItems(
  translate: TranslateFunction,
): readonly SideNavigationProps.Item[] {
  const mapNavigationItemToAwsSideNavigationItem = (
    item:
      | NavigationCategory
      | NavigationComponent
      | NavigationExternalLink
      | NavigationLink,
  ): SideNavigationProps.Item => {
    const mapNavigationTextToTranslation: (
      text: NavigationText,
    ) => string | undefined =
      mapTranslateFunctionToNavigationTextTranslator(translate);

    // Navigation category
    if (filterByNavigationCategory(item)) {
      const { children, defaultExpanded, text } = item;
      return {
        defaultExpanded,
        items: children.map(mapNavigationItemToAwsSideNavigationItem),
        text: mapNavigationTextToTranslation(text) ?? '...',
        type: 'section',
      };
    }

    // Navigation component
    if (filterByNavigationComponent(item)) {
      // Static navigation component
      const { Component, defaultExpanded, text } = item;
      if (filterByUndefined(defaultExpanded)) {
        return {
          href: '#',
          info: mapComponentToElement(Component),
          text: mapNavigationTextToTranslation(text) ?? '...',
          type: 'link',
        };
      }

      // Collapsable navigation component
      return {
        defaultExpanded,
        text: mapNavigationTextToTranslation(text) ?? '...',
        type: 'section',
        items: [
          {
            href: '#',
            info: mapComponentToElement(Component),
            text: '',
            type: 'link',
          },
        ],
      };
    }

    // Navigation external link
    if (filterByNavigationExternalLink(item)) {
      const { text, url } = item;
      return {
        external: true,
        href: url,
        text: mapNavigationTextToTranslation(text) ?? '...',
        type: 'link',
      };
    }

    // Navigation link
    const { path, text } = item;
    return {
      href: path,
      text: mapNavigationTextToTranslation(text) ?? '...',
      type: 'link',
    };
  };

  return NAVIGATION_ITEMS.map(mapNavigationItemToAwsSideNavigationItem);
}
