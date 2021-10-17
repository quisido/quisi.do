import type NavigationText from '../constants/navigation-text';

export default interface NavigationLink {
  readonly path: string;
  readonly text: NavigationText;
}
