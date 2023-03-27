import type ResultData from '../types/result-data';
import isObject from './is-object';
import findViewer from './is-viewer';

export default function isResultData(value: unknown): value is ResultData {
  return (
    isObject(value) &&
    'cost' in value &&
    typeof value.cost === 'number' &&
    'viewer' in value &&
    findViewer(value.viewer)
  );
}
