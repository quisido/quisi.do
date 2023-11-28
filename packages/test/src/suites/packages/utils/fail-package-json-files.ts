import type TreeLogger from '@monorepo-template/tree-logger';
import FILES_PROPERTY_ERROR from '../constants/files-property-error.js';

export default function failPackageJsonFiles(this: Readonly<TreeLogger>): void {
  this.addError(FILES_PROPERTY_ERROR);
}
