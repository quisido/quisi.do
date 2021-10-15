import Link from '@mui/material/Link';
import type { ReactElement, ReactNode } from 'react';
// import { Link as ReactRouterLink } from 'react-router-dom';

interface Props {
  readonly children: ReactNode;
  readonly path: string;
}

export default function MuiLink({ children, path }: Props): ReactElement {
  return (
    <Link color="inherit" href={path}>
      {children}
    </Link>
  );
}
