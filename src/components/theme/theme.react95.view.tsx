import { GlobalStyle, ThemeProvider } from '@react95/core';
import type { ReactElement, ReactNode } from 'react';
import useReact95Theme from './theme.react95.hook';

interface Props {
  readonly children: ReactNode;
}

export default function React95Theme({ children }: Props): ReactElement {
  useReact95Theme();
  return (
    <ThemeProvider>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
