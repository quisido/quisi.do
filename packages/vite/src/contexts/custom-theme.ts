import type { Provider } from 'react';
import createContextUtils from '../modules/create-context-utils/index.js';
import type CustomTheme from '../types/custom-theme.js';

const { ContextProvider, useContextValue } = createContextUtils<CustomTheme>();

export const CustomThemeProvider: Provider<CustomTheme> = ContextProvider;
export const useCustomTheme: () => CustomTheme = useContextValue;
