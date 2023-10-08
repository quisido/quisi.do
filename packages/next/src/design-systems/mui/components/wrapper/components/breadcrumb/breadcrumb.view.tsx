import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import type { ReactElement } from 'react';
import type Props from '../../types/breadcrumb-props';
import useWrapperBreadcrumb from './breadcrumb.hook';

export default function MuiWrapperBreadcrumb({
  children,
  current,
  path,
}: Props): ReactElement {
  const { currentProps } = useWrapperBreadcrumb();

  if (current) {
    return (
      <Typography color="text.primary" {...currentProps}>
        {children}
      </Typography>
    );
  }

  return (
    <MuiLink color="inherit" component={NextLink} href={path} underline="hover">
      {children}
    </MuiLink>
  );
}
