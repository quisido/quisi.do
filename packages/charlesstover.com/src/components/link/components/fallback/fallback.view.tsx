import { ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Props from '../../types/props';

export default function FallbackLink({
  children,
  className,
  href,
  title,
}: Props): ReactElement {
  return (
    <ReactRouterLink className={className} title={title} to={href}>
      {children}
    </ReactRouterLink>
  );
}