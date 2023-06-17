import type { LinkProps } from '@awsui/components-react/link';
import Link from '@awsui/components-react/link';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/link';
import useLink from './link.hook';

export default function AwsuiLink({
  category,
  children,
  className,
  href,
  title,
}: Readonly<Props>): ReactElement {
  const { external, handleFollow, ref, rel, target } = useLink({
    category,
    children,
    href,
    title,
  });

  const optionalProps: Pick<LinkProps, 'className' | 'rel'> = {};
  if (typeof className !== 'undefined') {
    optionalProps.className = className;
  }

  if (typeof rel !== 'undefined') {
    optionalProps.rel = rel;
  }

  return (
    <span ref={ref}>
      <Link
        {...optionalProps}
        external={external}
        href={href}
        onFollow={handleFollow}
        target={target}
      >
        {children}
      </Link>
    </span>
  );
}
