import { type PaperProps } from '@mui/material/Paper';
import WIDTH from './navigation-width';

const MUI_NAVIGATION_PAPER_PROPS: Partial<PaperProps> = {
  sx: {
    boxShadow: 'none',
    width: WIDTH,
  },
};

export default MUI_NAVIGATION_PAPER_PROPS;
