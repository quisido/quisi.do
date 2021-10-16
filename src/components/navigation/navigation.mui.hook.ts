import type { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { ComponentType } from 'react';
import Desktop from './navigation.mui-desktop.view';
import Mobile from './navigation.mui-mobile.view';
import type Props from './navigation.type.props';

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const mobileMediaQuery = (theme: Readonly<Theme>): string =>
  theme.breakpoints.down('lg');

export default function useMuiNavigation(): ComponentType<Props> {
  const isMobile: boolean = useMediaQuery(mobileMediaQuery);

  if (isMobile) {
    return Mobile;
  }

  return Desktop;
}
