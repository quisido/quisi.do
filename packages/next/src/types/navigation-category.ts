import type NavigationText from '../constants/navigation-text';
import type NavigationComponent from '../types/navigation-component';
import type NavigationExternalLink from '../types/navigation-external-link';
import type NavigationLink from '../types/navigation-link';

export default interface NavigationCategory {
  readonly defaultExpanded: boolean;
  readonly text: NavigationText;
  readonly children: readonly (
    | NavigationCategory
    | NavigationComponent
    | NavigationExternalLink
    | NavigationLink
  )[];
}
