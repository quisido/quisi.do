import { type Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useMuiMobile(): boolean {
  const theme: Theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('lg'));
}
