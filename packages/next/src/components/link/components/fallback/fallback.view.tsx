'use client';

import NextLink from 'next/link';
import type { ReactElement } from 'react';
import type Props from '../../types/props';

export default function FallbackLink({
  children,
  className,
  href,
  title,
}: Props): ReactElement {
  return (
    <NextLink className={className} href={href} title={title}>
      {children}
    </NextLink>
  );
}
