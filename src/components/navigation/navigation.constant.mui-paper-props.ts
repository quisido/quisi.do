import type { PaperProps } from '@mui/material/Paper';
import mapThemeToMuiPaperBackground from './navigation.util.map-theme-to-mui-paper-background';

const MUI_PAPER_PROPS: Partial<PaperProps> = {
  sx: {
    background: mapThemeToMuiPaperBackground,
    boxShadow: 'none',
    width: 250,
  },
};

export default MUI_PAPER_PROPS;
