import type NavigationText from '../constants/navigation-text.js';

export default interface NavigationLink {
  readonly path: string;
  readonly text: NavigationText;
}
