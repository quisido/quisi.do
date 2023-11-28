import { type SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import { type TranslateFunction } from 'lazy-i18n';
import NAVIGATION_ITEMS from '../../../../../constants/navigation-items';
import type NavigationText from '../../../../../constants/navigation-text';
import type NavigationCategory from '../../../../../types/navigation-category';
import type NavigationComponent from '../../../../../types/navigation-component';
import type NavigationExternalLink from '../../../../../types/navigation-external-link';
import type NavigationLink from '../../../../../types/navigation-link';
import filterNavigationByCategory from '../../../../../utils/filter-navigation-by-category';
import filterNavigationByComponent from '../../../../../utils/filter-navigation-by-component';
import filterNavigationByExternalLink from '../../../../../utils/filter-navigation-by-external-link';
import mapComponentToElement from '../../../../../utils/map-component-to-element';
import mapTranslateFunctionToNavigationTextTranslator from '../../../../../utils/map-translate-function-to-navigation-text-translator';

export default function mapTranslationFunctionToCloudscapeSideNavigationItems(
  translate: TranslateFunction,
): readonly SideNavigationProps.Item[] {
  const mapNavigationItemToCloudscapeSideNavigationItem = (
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
    if (filterNavigationByCategory(item)) {
      const { children, defaultExpanded, text } = item;
      return {
        defaultExpanded,
        items: children.map(mapNavigationItemToCloudscapeSideNavigationItem),
        text: mapNavigationTextToTranslation(text) ?? '...',
        type: 'section',
      };
    }

    // Navigation component
    if (filterNavigationByComponent(item)) {
      // Static navigation component
      const { Component, defaultExpanded, text } = item;
      if (typeof defaultExpanded === 'undefined') {
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
    if (filterNavigationByExternalLink(item)) {
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

  return NAVIGATION_ITEMS.map(mapNavigationItemToCloudscapeSideNavigationItem);
}
