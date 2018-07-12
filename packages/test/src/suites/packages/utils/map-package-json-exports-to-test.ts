import type TreeLogger from '@monorepo-template/tree-logger';
import filterByRecord from '../../../utils/filter-by-record.js';
import DEFAULT_EXPORT_CONDITION_INDEX_ERROR from '../constants/default-export-condition-index-error.js';
import findDefaultString from './find-default-string.js';

const ARRAY_INDEX_OFFSET = 1;
const NOT_FOUND = -1;

export default function mapPackageJsonExportsToTest(
  exports: Readonly<Record<string, unknown>>,
): (this: Readonly<TreeLogger>) => void {
  return function testPackageJsonExports(this: Readonly<TreeLogger>): void {
    for (const [path, record] of Object.entries(exports)) {
      if (!filterByRecord(record)) {
        continue;
      }

      this.scope(path, (): void => {
        const keys: readonly string[] = Object.keys(record);

        const defaultExportIndex: number = keys.findIndex(findDefaultString);
        if (defaultExportIndex === NOT_FOUND) {
          return;
        }

        const lastExportIndex: number = keys.length - ARRAY_INDEX_OFFSET;
        if (defaultExportIndex !== lastExportIndex) {
          this.addError(DEFAULT_EXPORT_CONDITION_INDEX_ERROR);
        }
      });
    }
  };
}
