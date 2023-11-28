import type TreeLogger from '@monorepo-template/tree-logger';

export default interface Test {
  test: (this: Readonly<TreeLogger>) => void;
}
