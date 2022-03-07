import { TitleBar, Tooltip } from '@react95/core';
import type { ReactElement } from 'react';
import type Props from './types/props';

export default function React95Chip({
  children,
  className,
  title,
}: Readonly<Props>): ReactElement {
  return (
    <TitleBar
      active={false}
      className={className}
      title={
        (
          <Tooltip text={title as unknown as string}>{children}</Tooltip>
        ) as unknown as string
      }
    />
  );
}
