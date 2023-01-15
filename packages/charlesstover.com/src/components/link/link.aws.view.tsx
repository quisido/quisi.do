import type { LinkProps } from '@awsui/components-react/link';
import Link from '@awsui/components-react/link';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import useAwsLink from './link.aws.hook';
import type Props from './types/props';

export default function AwsLink({
  children,
  className,
  href,
  title,
}: Readonly<Props>): ReactElement {
  const { external, ref, rel, target } = useAwsLink({ children, href, title });

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
