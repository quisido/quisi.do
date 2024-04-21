import type TreeLogger from '@monorepo-template/tree-logger';

export default function failPackageJsonFiles(this: Readonly<TreeLogger>): void {
  this.addError(new Error(
    'Replace the `files` property with a `.npmignore` file.',
  ));
}
