import Link, { type LinkProps } from '@mui/material/Link';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/link/index.js';
import useLink from './link.hook.js';
import optional from '../../../../utils/optional.js';

export default function MuiLink({
  children,
  className,
  feature,
  href,
  label,
  title,
}: Props): ReactElement {
  const { handleClick, rel } = useLink({
    feature,
    href,
    title,
  });

  return (
    <Link
      aria-label={label}
      {...optional<LinkProps>('className', className)}
      color="inherit"
      href={href}
      onClick={handleClick}
      rel={rel}
      title={title}
    >
      {children}
    </Link>
  );
}
