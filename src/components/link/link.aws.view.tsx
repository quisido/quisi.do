import Link, { LinkProps } from '@awsui/components-react/link';
import type { ReactElement, ReactNode } from 'react';

interface Props extends Omit<LinkProps, 'href'> {
  readonly children: ReactNode;
  readonly path: string;
}

export default function AwsLink({
  children,
  path,
  ...props
}: Props): ReactElement {
  return (
    <Link {...props} href={path}>
      {children}
    </Link>
  );
}
