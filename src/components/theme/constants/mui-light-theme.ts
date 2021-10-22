import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const MUI_LIGHT_THEME: Theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default MUI_LIGHT_THEME;
