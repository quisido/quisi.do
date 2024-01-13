import { type Theme } from '@mui/material/styles';
import useDarkMode from '../../../../hooks/use-dark-mode.js';
import MUI_DARK_THEME from './constants/dark-theme.js';
import MUI_LIGHT_THEME from './constants/light-theme.js';

export default function useMuiTheme(): Theme {
  const [isDarkModeEnabled] = useDarkMode();

  if (isDarkModeEnabled) {
    return MUI_DARK_THEME;
  }

  return MUI_LIGHT_THEME;
}
