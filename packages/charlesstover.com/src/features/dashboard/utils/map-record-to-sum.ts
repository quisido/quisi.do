import findDefined from '../../../utils/find-defined';
import sum from '../../../utils/sum';

const NONE = 0;

export default function mapRecordToSum(
  record: Record<string, number | undefined>,
): number {
  return Object.values(record).filter(findDefined).reduce(sum, NONE);
}
