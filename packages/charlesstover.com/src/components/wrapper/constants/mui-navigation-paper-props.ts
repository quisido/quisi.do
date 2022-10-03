import type { PaperProps } from '@mui/material/Paper';
import MUI_NAVIGATION_WIDTH from '../constants/mui-navigation-width';

const MUI_NAVIGATION_PAPER_PROPS: Partial<PaperProps> = {
  sx: {
    boxShadow: 'none',
    width: MUI_NAVIGATION_WIDTH,
  },
};

export default MUI_NAVIGATION_PAPER_PROPS;
