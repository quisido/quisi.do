import type CustomTheme from '../types/custom-theme.js';
import createContextUtils from '../modules/create-context-utils/index.js';

export const {
  ContextProvider: CustomThemeProvider,
  useContextValue: useCustomTheme,
} = createContextUtils<CustomTheme>();
