import type NavigationCategory from '../types/navigation-category';
import type NavigationComponent from '../types/navigation-component';
import type NavigationExternalLink from '../types/navigation-external-link';
import type NavigationLink from '../types/navigation-link';
import isHrefExternal from './is-href-external';

export default function filterNavigationByExternalLink(
  item:
    | NavigationCategory
    | NavigationComponent
    | NavigationExternalLink
    | NavigationLink,
): item is NavigationExternalLink {
  return 'url' in item && isHrefExternal(item.url);
}
