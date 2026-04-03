import { type ReactElement } from 'react';
import mapUrlToHref from '../../utils/map-url-to-href.js';
import { Link } from '../../design-systems/template/index.js';

interface Props {
  readonly children: string | null;
}

export default function ContentSecurityPolicyBlockedUrlLink({
  children,
}: Props): ReactElement | null {
  if (children === null) {
    return null;
  }

  const href: string | null = mapUrlToHref(children);
  if (href === null) {
    return null;
  }

  return (
    <Link href={href} title="">
      {children}
    </Link>
  );
}
