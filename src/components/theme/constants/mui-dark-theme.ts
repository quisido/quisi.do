import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const MUI_DARK_THEME: Theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default MUI_DARK_THEME;
