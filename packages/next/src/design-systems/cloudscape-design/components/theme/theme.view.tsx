import { type PropsWithChildren, type ReactElement } from 'react';
import useTheme from './theme.hook';

export default function CloudscapeDesignTheme({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  useTheme();

  return <>{children}</>;
}
