import Popover from '@awsui/components-react/popover';
import type { ReactElement, ReactNode } from 'react';
import isDefined from '../../../../utils/is-defined';
import validateString from '../../../../utils/validate-string';
import styles from './aws-popover.module.scss';

interface Props {
  readonly children: ReactNode;
  readonly title?: ReactNode | undefined;
}

const rootClassName: string = validateString(styles.root);

export default function AwsChipPopover({
  children,
  title,
}: Readonly<Props>): ReactElement {
  if (!isDefined(title)) {
    return <>{children}</>;
  }
  return (
    <Popover className={rootClassName} content={<>{title}</>} size="small">
      {children}
    </Popover>
  );
}
