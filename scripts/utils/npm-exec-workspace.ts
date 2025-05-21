import { execFileSync } from 'node:child_process';

export default function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): Buffer {
  return execFileSync(
    'npm',
    [...script, `--workspace=packages/${workspaceDirectory}`],
    { stdio: 'inherit' },
  );
}
