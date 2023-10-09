import { type Theme, createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import BASE_THEME_OPTIONS from './base-theme-options';
import DARK_THEME_OPTIONS from './dark-theme-options';

const MUI_DARK_THEME: Theme = createTheme(
  deepmerge(BASE_THEME_OPTIONS, DARK_THEME_OPTIONS),
);

export default MUI_DARK_THEME;
