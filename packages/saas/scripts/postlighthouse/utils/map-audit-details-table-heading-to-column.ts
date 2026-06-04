import type { IcuMessage } from 'lighthouse';
import type { AuditDetails } from './audit-details.js';
import type { Table } from 'console-table-printer';

type ColumnOptionsRaw = Exclude<Parameters<Table['addColumn']>[0], string>;

const MAX_LENGTH = 20;

const mapIcuMessageToString = (value: IcuMessage | string): string => {
  if (typeof value === 'string') {
    return value;
  }

  return value.formattedDefault;
};

export default function mapAuditDetailsTableHeadingToColumn({
  key,
  label,
}: AuditDetails.TableColumnHeading): ColumnOptionsRaw {
  const title = mapIcuMessageToString(label);

  return {
    alignment: 'left',
    maxLen: MAX_LENGTH,
    name: key ?? title,
    title,
  };
}
