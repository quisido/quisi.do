import { Button } from '@react95/core';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';

export default function React95Button({
  children,
  href,
}: Readonly<Props>): ReactElement {
  if (filterByDefined(href)) {
    return (
      <a href={href}>
        <Button>{children}</Button>
      </a>
    );
  }

  return <Button>{children}</Button>;
}
