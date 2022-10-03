import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import BASE_THEME_OPTIONS from '../constants/mui-base-theme-options';
import DARK_THEME_OPTIONS from '../constants/mui-dark-theme-options';

const MUI_DARK_THEME: Theme = createTheme(
  deepmerge(BASE_THEME_OPTIONS, DARK_THEME_OPTIONS),
);

export default MUI_DARK_THEME;