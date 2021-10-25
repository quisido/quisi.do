import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import DEFAULT_THEME_OPTIONS from './default-mui-theme-options';

const MUI_DARK_THEME: Theme = createTheme({
  ...DEFAULT_THEME_OPTIONS,
  palette: {
    mode: 'dark',
  },
});

export default MUI_DARK_THEME;
