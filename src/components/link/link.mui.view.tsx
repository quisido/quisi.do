import Link from '@mui/material/Link';
import type { ReactElement } from 'react';
import useMuiLink from './link.mui.hook';
import type Props from './link.type.props';

export default function MuiLink({
  children,
  href,
}: Readonly<Props>): ReactElement {
  const { handleClick, rel } = useMuiLink(href);

  return (
    <Link color="inherit" href={href} onClick={handleClick} rel={rel}>
      {children}
    </Link>
  );
}
