import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import type Props from './types/props';

export default function React95Link({
  children,
  className,
  href,
  title,
}: Readonly<Props>): ReactElement {
  return (
    <Link className={className} title={title} to={href}>
      {children}
    </Link>
  );
}
