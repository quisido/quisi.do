import NumberFormat from 'number-format-react';
import { type ReactElement } from 'react';
import validateString from '../../../../utils/validate-string';
import type Item from '../../types/packages-item';
import styles from './direct-downloads-cell.module.scss';

const rootClassName: string = validateString(styles.root);

export default function PackagesDirectDownloadsCell({
  directDownloads,
}: Readonly<Item>): ReactElement {
  return (
    <div className={rootClassName}>
      <NumberFormat>{directDownloads}</NumberFormat>
    </div>
  );
}
