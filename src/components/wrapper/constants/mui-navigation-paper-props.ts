import type { PaperProps } from '@mui/material/Paper';
import mapThemeToMuiNavigationPaperBackground from '../utils/map-theme-to-mui-navigation-paper-background';

const MUI_NAVIGATION_PAPER_PROPS: Partial<PaperProps> = {
  sx: {
    background: mapThemeToMuiNavigationPaperBackground,
    boxShadow: 'none',
    width: 250,
  },
};

export default MUI_NAVIGATION_PAPER_PROPS;
