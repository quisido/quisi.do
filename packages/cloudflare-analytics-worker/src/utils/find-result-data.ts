import type ResultData from '../types/result-data';
import findObject from './find-object';
import findViewer from './find-viewer';

export default function findResultData(value: unknown): value is ResultData {
  return (
    findObject(value) &&
    'cost' in value &&
    typeof value.cost === 'number' &&
    'viewer' in value &&
    findViewer(value.viewer)
  );
}
