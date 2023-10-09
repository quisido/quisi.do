import Badge, type { BadgeProps } from '@cloudscape-design/components/badge';
import  { type ReactElement } from 'react';
import  { type Props } from '../../../../components/chip';
import Popover from './components/popover';

export default function CloudscapeDesignChip({
  children,
  className,
  title,
}: Props): ReactElement {
  const optionalProps: Pick<BadgeProps, 'className'> = {};
  if (typeof className !== 'undefined') {
    optionalProps.className = className;
  }

  return (
    <Badge {...optionalProps}>
      <Popover title={title}>{children}</Popover>
    </Badge>
  );
}
