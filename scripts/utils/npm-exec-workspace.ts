import npmExec from './npm-exec.js';

export default async function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): Promise<string> {
  return await npmExec(...script, `--workspace=packages/${workspaceDirectory}`);
}
