import { type ColumnOptionsRaw } from 'console-table-printer/dist/src/models/external-table';
import { type default as AuditDetails } from 'lighthouse/types/lhr/audit-details.js';
import { type IcuMessage } from 'lighthouse/types/lhr/i18n.js';

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
