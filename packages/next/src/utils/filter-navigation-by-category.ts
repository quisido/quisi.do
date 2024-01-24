import type NavigationCategory from '../types/navigation-category.js';
import type NavigationComponent from '../types/navigation-component.js';
import type NavigationExternalLink from '../types/navigation-external-link.js';
import type NavigationLink from '../types/navigation-link.js';

export default function filterNavigationByCategory(
  item:
    | NavigationCategory
    | NavigationComponent
    | NavigationExternalLink
    | NavigationLink,
): item is NavigationCategory {
  return Object.prototype.hasOwnProperty.call(item, 'children');
}
