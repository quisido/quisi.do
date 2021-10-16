import CssBaseline from '@mui/material/CssBaseline';
import type { Theme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import type { ReactElement, ReactNode } from 'react';
import useMuiTheme from './theme.mui.hook';

interface Props {
  readonly children: ReactNode;
}

export default function MuiTheme({ children }: Props): ReactElement {
  const theme: Theme = useMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
