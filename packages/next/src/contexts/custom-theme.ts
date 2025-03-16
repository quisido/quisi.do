import type CustomTheme from '../types/custom-theme.js';
import createContextUtils from '../utils/create-context-utils/create-context-utils.js';

export const {
  ContextProvider: CustomThemeProvider,
  useContextValue: useCustomTheme,
} = createContextUtils<CustomTheme>();
