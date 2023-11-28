import { type Theme } from '@mui/material/styles';
import useDarkMode from '../../../../hooks/use-dark-mode';
import MUI_DARK_THEME from './constants/dark-theme';
import MUI_LIGHT_THEME from './constants/light-theme';

export default function useMuiTheme(): Theme {
  const [isDarkModeEnabled] = useDarkMode();

  if (isDarkModeEnabled) {
    return MUI_DARK_THEME;
  }

  return MUI_LIGHT_THEME;
}
