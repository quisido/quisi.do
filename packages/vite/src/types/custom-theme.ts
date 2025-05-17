import type Theme from './theme.js';

// A custom theme is a theme with mutability.

export default interface CustomTheme extends Theme {
  readonly dev: boolean;
  readonly toggleLines: VoidFunction;
}
