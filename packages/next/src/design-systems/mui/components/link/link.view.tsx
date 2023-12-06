import Link, { type LinkProps } from '@mui/material/Link';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/link';
import useLink from './link.hook';

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

  const optionalProps: Pick<LinkProps, 'className'> = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }

  return (
    <Link
      aria-label={label}
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
