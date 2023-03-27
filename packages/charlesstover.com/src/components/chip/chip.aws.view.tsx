import type { BadgeProps } from '@awsui/components-react/badge';
import Badge from '@awsui/components-react/badge';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
import Popover from './components/aws-popover';
import type Props from './types/props';

export default function AwsChip({
  children,
  className,
  title,
}: Readonly<Props>): ReactElement {
  const optionalProps: Pick<BadgeProps, 'className'> = {};
  if (isDefined(className)) {
    optionalProps.className = className;
  }

  return (
    <Badge {...optionalProps}>
      <Popover title={title}>{children}</Popover>
    </Badge>
  );
}
