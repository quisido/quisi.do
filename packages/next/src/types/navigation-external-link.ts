import type NavigationText from '../constants/navigation-text.js';

export default interface NavigationExternalLink {
  readonly text: NavigationText;
  readonly url: string;
}
