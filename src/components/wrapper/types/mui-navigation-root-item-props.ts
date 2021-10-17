import type NavigationCategory from '../types/navigation-category';
import type NavigationComponent from '../types/navigation-component';
import type NavigationExternalLink from '../types/navigation-external-link';
import type NavigationLink from '../types/navigation-link';

export default interface MuiNavigationRootItemProps {
  readonly divider: boolean;
  readonly item:
    | NavigationCategory
    | NavigationComponent
    | NavigationExternalLink
    | NavigationLink;
}
