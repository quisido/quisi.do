import TreeLogger from '@monorepo-template/tree-logger';
import { GitHubWorkflowsTest, PackagesTest, VSCodeTest } from '../index.js';

new TreeLogger('Testing the monorepo')
  .scope('GitHub workflows', new GitHubWorkflowsTest().test)
  .scope('Packages', new PackagesTest().test)
  .scope('VSCode', new VSCodeTest().test)
  .log();
