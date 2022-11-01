import Popover from '@cloudscape-design/components/popover';
import type { ReactElement, ReactNode } from 'react';
import filterByDefined from '../../../../utils/filter-by-defined';
import validateString from '../../../../utils/validate-string';
import styles from './cloudscape-popover.module.scss';

interface Props {
  readonly children: ReactNode;
  readonly title?: ReactNode | undefined;
}

const rootClassName: string = validateString(styles.root);

export default function CloudscapeChipPopover({
  children,
  title,
}: Readonly<Props>): ReactElement {
  if (!filterByDefined(title)) {
    return <>{children}</>;
  }
  return (
    <Popover className={rootClassName} content={<>{title}</>} size="small">
      {children}
    </Popover>
  );
}
