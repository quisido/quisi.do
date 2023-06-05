import type Datasets from '../types/datasets';
import type Viewer from '../types/viewer';
import isDatasets from './is-datasets';
import isObject from './is-object';

const SINGLE = 1;

const hasDatasets = (value: unknown): value is [Datasets] =>
  Array.isArray(value) && value.length === SINGLE && value.every(isDatasets);

export default function isViewer(value: unknown): value is Viewer {
  return (
    isObject(value) &&
    (!('accounts' in value) || hasDatasets(value.accounts)) &&
    'budget' in value &&
    typeof value.budget === 'number' &&
    (!('zones' in value) || hasDatasets(value.zones))
  );
}
