import CssBaseline from '@mui/material/CssBaseline';
import type { Theme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import type { PropsWithChildren, ReactElement } from 'react';
import useTheme from './theme.hook';

export default function MuiTheme({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  const theme: Theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
