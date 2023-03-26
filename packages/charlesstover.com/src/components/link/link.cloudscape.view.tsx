import type { LinkProps } from '@cloudscape-design/components/link';
import Link from '@cloudscape-design/components/link';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
import useCloudscapeLink from './link.cloudscape.hook';
import type Props from './types/props';

export default function CloudscapeLink({
  children,
  className,
  href,
  title,
}: Readonly<Props>): ReactElement {
  const { external, ref, rel, target } = useCloudscapeLink({ href, title });

  const optionalProps: Pick<LinkProps, 'className' | 'rel'> = {};
  if (isDefined(className)) {
    optionalProps.className = className;
  }
  if (isDefined(rel)) {
    optionalProps.rel = rel;
  }

  return (
    <span ref={ref}>
      <Link {...optionalProps} external={external} href={href} target={target}>
        {children}
      </Link>
    </span>
  );
}
