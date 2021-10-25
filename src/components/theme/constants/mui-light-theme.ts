import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import DEFAULT_THEME_OPTIONS from './default-mui-theme-options';

const MUI_LIGHT_THEME: Theme = createTheme({
  ...DEFAULT_THEME_OPTIONS,
  palette: {
    mode: 'light',
  },
});

export default MUI_LIGHT_THEME;
