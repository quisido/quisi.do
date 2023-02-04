import type { BadgeProps } from '@cloudscape-design/components/badge';
import Badge from '@cloudscape-design/components/badge';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
import Popover from './components/cloudscape-popover';
import type Props from './types/props';

export default function CloudscapeChip({
  children,
  className,
  title,
}: Readonly<Props>): ReactElement {
  const optionalProps: Pick<BadgeProps, 'className'> = {};
  if (findDefined(className)) {
    optionalProps.className = className;
  }

  return (
    <Badge {...optionalProps}>
      <Popover title={title}>{children}</Popover>
    </Badge>
  );
}
