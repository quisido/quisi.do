import type { LinkProps } from '@mui/material/Link';
import Link from '@mui/material/Link';
import type { ReactElement } from 'react';
import useMuiLink from './link.mui.hook';
import type Props from './types/props';

export default function MuiLink({
  children,
  className,
  href,
  title,
}: Readonly<Props>): ReactElement {
  const { handleClick, rel } = useMuiLink(href);

  const optionalProps: Pick<LinkProps, 'className'> = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }

  return (
    <Link
      color="inherit"
      href={href}
      onClick={handleClick}
      rel={rel}
      title={title}
      {...optionalProps}
    >
      {children}
    </Link>
  );
}
