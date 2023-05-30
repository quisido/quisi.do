import { ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import type Props from '../../types/props';

export default function FallbackLink({
  children,
  className,
  href,
  title,
}: Readonly<Props>): ReactElement {
  return (
    <ReactRouterLink className={className} title={title} to={href}>
      {children}
    </ReactRouterLink>
  );
}
