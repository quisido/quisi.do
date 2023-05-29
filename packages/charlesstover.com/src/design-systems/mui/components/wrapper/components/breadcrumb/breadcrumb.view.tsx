import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import type Props from '../../types/breadcrumb-props';
import useWrapperBreadcrumb from './breadcrumb.hook';

export default function MuiWrapperBreadcrumb({
  children,
  current,
  path,
}: Readonly<Props>): ReactElement {
  const { currentProps } = useWrapperBreadcrumb();

  if (current) {
    return (
      <Typography color="text.primary" {...currentProps}>
        {children}
      </Typography>
    );
  }

  return (
    <MuiLink
      color="inherit"
      component={ReactRouterLink}
      to={path}
      underline="hover"
    >
      {children}
    </MuiLink>
  );
}
