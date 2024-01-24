import type NavigationCategory from '../types/navigation-category.js';
import type NavigationComponent from '../types/navigation-component.js';
import type NavigationExternalLink from '../types/navigation-external-link.js';
import type NavigationLink from '../types/navigation-link.js';
import isHrefExternal from './is-href-external.js';

export default function filterNavigationByExternalLink(
  item:
    | NavigationCategory
    | NavigationComponent
    | NavigationExternalLink
    | NavigationLink,
): item is NavigationExternalLink {
  return 'url' in item && isHrefExternal(item.url);
}
