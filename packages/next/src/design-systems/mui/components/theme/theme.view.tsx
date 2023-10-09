import CssBaseline from '@mui/material/CssBaseline';
import { type Theme, ThemeProvider } from '@mui/material/styles';
import { type PropsWithChildren, type ReactElement } from 'react';
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
