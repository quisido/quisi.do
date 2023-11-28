import { type Theme, createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import BASE_THEME_OPTIONS from './base-theme-options';
import LIGHT_THEME_OPTIONS from './light-theme-options';

const MUI_LIGHT_THEME: Theme = createTheme(
  deepmerge(BASE_THEME_OPTIONS, LIGHT_THEME_OPTIONS),
);

export default MUI_LIGHT_THEME;
