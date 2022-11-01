import type { LinkProps } from '@cloudscape-design/components/link';
import Link from '@cloudscape-design/components/link';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
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
  if (filterByDefined(className)) {
    optionalProps.className = className;
  }
  if (filterByDefined(rel)) {
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
