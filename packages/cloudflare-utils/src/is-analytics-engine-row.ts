import { isNumber, isRecord, isString } from 'fmrs';
import type AnalyticsEngineRow from './analytics-engine-row.js';
import getValues from './get-values.js';

const NUMBER_KEYS = [
  '_sample_interval',
  'double1',
  'double2',
  'double3',
  'double4',
  'double5',
  'double6',
  'double7',
  'double8',
  'double9',
  'double10',
  'double11',
  'double12',
  'double13',
  'double14',
  'double15',
  'double16',
  'double17',
  'double18',
  'double19',
  'double20',
  'timestamp',
] as const;

const STRING_KEYS = [
  'blob1',
  'blob2',
  'blob3',
  'blob4',
  'blob5',
  'blob6',
  'blob7',
  'blob8',
  'blob9',
  'blob10',
  'blob11',
  'blob12',
  'blob13',
  'blob14',
  'blob15',
  'blob16',
  'blob17',
  'blob18',
  'blob19',
  'blob20',
  'dataset',
  'index1',
] as const;

export default function isAnalyticsEngineRow(
  value: unknown,
): value is AnalyticsEngineRow {
  return (
    isRecord(value) &&
    getValues(value, NUMBER_KEYS).every(isNumber) &&
    getValues(value, STRING_KEYS).every(isString)
  );
}
