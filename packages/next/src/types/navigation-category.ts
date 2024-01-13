import type NavigationText from '../constants/navigation-text.js';
import type NavigationComponent from '../types/navigation-component.js';
import type NavigationExternalLink from '../types/navigation-external-link.js';
import type NavigationLink from '../types/navigation-link.js';

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
