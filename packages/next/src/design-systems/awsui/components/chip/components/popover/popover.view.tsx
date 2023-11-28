import Popover from '@awsui/components-react/popover';
import { type ReactElement, type ReactNode } from 'react';
import validateString from '../../../../../../utils/validate-string';
import styles from './popover.module.scss';

interface Props {
  readonly children: ReactNode;
  readonly title?: ReactNode | undefined;
}

const rootClassName: string = validateString(styles.root);

export default function AwsuiChipPopover({
  children,
  title,
}: Props): ReactElement {
  if (typeof title === 'undefined') {
    return <>{children}</>;
  }

  return (
    <Popover className={rootClassName} content={<>{title}</>} size="small">
      {children}
    </Popover>
  );
}
