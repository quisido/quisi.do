import { execFileSync } from 'node:child_process';

export default function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): string {
  return execFileSync(
    'npm',
    [...script, `--workspace=packages/${workspaceDirectory}`],
    { encoding: 'utf-8', shell: true, stdio: 'inherit' },
  );
}
