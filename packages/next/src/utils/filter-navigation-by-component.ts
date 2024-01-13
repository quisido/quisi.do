import type NavigationCategory from '../types/navigation-category.js';
import type NavigationComponent from '../types/navigation-component.js';
import type NavigationExternalLink from '../types/navigation-external-link.js';
import type NavigationLink from '../types/navigation-link.js';

export default function filterNavigationByComponent(
  item:
    | NavigationCategory
    | NavigationComponent
    | NavigationExternalLink
    | NavigationLink,
): item is NavigationComponent {
  return Object.prototype.hasOwnProperty.call(item, 'Component');
}
