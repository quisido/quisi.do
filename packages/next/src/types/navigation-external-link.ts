import type NavigationText from '../constants/navigation-text';

export default interface NavigationExternalLink {
  readonly text: NavigationText;
  readonly url: string;
}
