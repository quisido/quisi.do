import type { LinkProps } from '@awsui/components-react/link';
import Link from '@awsui/components-react/link';
import type { ReactElement } from 'react';
import useAwsLink from './link.aws.hook';
import type Props from './link.type.props';

export default function AwsLink({
  children,
  href,
}: Readonly<Props>): ReactElement {
  const { external, rel, target } = useAwsLink({ href });

  const optionalProps: Pick<LinkProps, 'rel'> = {};
  if (typeof rel !== 'undefined') {
    optionalProps.rel = rel;
  }

  return (
    <Link {...optionalProps} external={external} href={href} target={target}>
      {children}
    </Link>
  );
}
