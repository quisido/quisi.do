import { sortEntriesByKey } from 'fmrs';
import reduceEntriesToDependencies from './reduce-entries-to-dependencies.js';

export default function mapObjectToDependencies(
  obj: object,
): readonly unknown[] {
  return Object.entries(obj)
    .sort(sortEntriesByKey)
    .reduce(reduceEntriesToDependencies, []);
}
