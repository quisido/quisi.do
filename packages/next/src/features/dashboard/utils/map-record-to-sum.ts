import isDefined from '../../../utils/is-defined.js';
import sum from '../../../utils/sum.js';

const NONE = 0;

export default function mapRecordToSum(
  record: Record<string, number | undefined>,
): number {
  return Object.values(record).filter(isDefined).reduce(sum, NONE);
}
