import { type ComponentType } from 'react';
import type NavigationText from '../constants/navigation-text.js';

export default interface NavigationComponent {
  readonly Component: ComponentType<unknown>;
  readonly defaultExpanded?: boolean | undefined;
  readonly text: NavigationText;
}
