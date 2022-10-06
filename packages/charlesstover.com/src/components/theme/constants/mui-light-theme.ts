import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import BASE_THEME_OPTIONS from '../constants/mui-base-theme-options';
import LIGHT_THEME_OPTIONS from '../constants/mui-light-theme-options';

const MUI_LIGHT_THEME: Theme = createTheme(
  deepmerge(BASE_THEME_OPTIONS, LIGHT_THEME_OPTIONS),
);

export default MUI_LIGHT_THEME;
