import type Viewer from '../types/viewer';
import findDatasets from './find-datasets';
import findObject from './find-object';

const SINGLE = 1;

export default function findViewer(value: unknown): value is Viewer {
  return (
    findObject(value) &&
    'accounts' in value &&
    Array.isArray(value.accounts) &&
    value.accounts.length === SINGLE &&
    value.accounts.every(findDatasets) &&
    'budget' in value &&
    typeof value.budget === 'number'
  );
}
