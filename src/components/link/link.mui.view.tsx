import Link from '@mui/material/Link';
import type { ReactElement, ReactNode } from 'react';
import useMuiLink from './link.mui.hook';

interface Props {
  readonly children: ReactNode;
  readonly path: string;
}

export default function MuiLink({
  children,
  path,
}: Readonly<Props>): ReactElement {
  const { handleClick } = useMuiLink(path);

  return (
    <Link color="inherit" href={path} onClick={handleClick}>
      {children}
    </Link>
  );
}
