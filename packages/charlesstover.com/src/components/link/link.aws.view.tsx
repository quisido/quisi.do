import type { LinkProps } from '@awsui/components-react/link';
import Link from '@awsui/components-react/link';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
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
