import type TreeLogger from '@monorepo-template/tree-logger';
import mapGitHubWorkflowEventNameToPathsTypeError from './map-github-workflow-event-name-to-paths-type-error.js';

export default function mapGitHubWorkflowEventNameToPathsTypeFail(
  event: string,
): (this: Readonly<TreeLogger>) => void {
  return function failGitHubWorkflowEvent(this: Readonly<TreeLogger>): void {
    this.addError(mapGitHubWorkflowEventNameToPathsTypeError(event));
  };
}
