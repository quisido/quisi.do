import type { LinkProps } from '@mui/material/Link';
import Link from '@mui/material/Link';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/link';
import useMuiLink from './link.hook';

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
