import type { BadgeProps } from '@awsui/components-react/badge';
import Badge from '@awsui/components-react/badge';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/chip';
import Popover from './components/popover';

export default function AwsuiChip({
  children,
  className,
  title,
}: Readonly<Props>): ReactElement {
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
