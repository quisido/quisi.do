import type { LinkProps } from '@cloudscape-design/components/link';
import Link from '@cloudscape-design/components/link';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
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
  if (findDefined(className)) {
    optionalProps.className = className;
  }
  if (findDefined(rel)) {
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
