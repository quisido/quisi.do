import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import type Props from '../../types/mui-breadcrumb-props';

export default function MuiWrapperBreadcrumb({
  children,
  current,
  path,
}: Readonly<Props>): ReactElement {
  if (current) {
    return <Typography color="text.primary">{children}</Typography>;
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
