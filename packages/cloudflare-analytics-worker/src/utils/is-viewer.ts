import type Viewer from '../types/viewer';
import isDatasets from './is-datasets';
import isObject from './is-object';

const SINGLE = 1;

export default function isViewer(value: unknown): value is Viewer {
  return (
    isObject(value) &&
    'accounts' in value &&
    Array.isArray(value.accounts) &&
    value.accounts.length === SINGLE &&
    value.accounts.every(isDatasets) &&
    'budget' in value &&
    typeof value.budget === 'number'
  );
}
