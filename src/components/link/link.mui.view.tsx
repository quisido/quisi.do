import Link from '@mui/material/Link';
import type { ReactElement } from 'react';
import useMuiLink from './link.mui.hook';
import type Props from './link.type.props';

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
