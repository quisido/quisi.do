import NumberFormat from 'number-format-react';
import type { ReactElement } from 'react';
import validateString from '../../../../utils/validate-string';
import type Item from '../../types/packages-item';
import styles from './total-downloads-cell.module.scss';

const rootClassName: string = validateString(styles.root);

export default function PackagesTotalDownloadsCell({
  totalDownloads,
}: Item): ReactElement {
  return (
    <div className={rootClassName}>
      <NumberFormat>{totalDownloads}</NumberFormat>
    </div>
  );
}
