import type ResultData from '../types/result-data.js';
import isObject from './is-object.js';
import isViewer from './is-viewer.js';

export default function isResultData(value: unknown): value is ResultData {
  return (
    isObject(value) &&
    'cost' in value &&
    typeof value.cost === 'number' &&
    'viewer' in value &&
    isViewer(value.viewer)
  );
}
