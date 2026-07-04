import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

const SKILL_DIRECTORY = join('.agents', 'skills');

const WORKFLOW_PATHS = [
  join('.github', 'workflows', 'main.yml'),
  join('.github', 'workflows', 'pull-request.yml'),
] as const;

const skillNames: readonly string[] = (
  await readdir(SKILL_DIRECTORY, {
    withFileTypes: true,
  })
)
  .filter((directoryEntry): boolean => directoryEntry.isDirectory())
  .map((directoryEntry): string => directoryEntry.name)
  .sort();

describe.each(WORKFLOW_PATHS)('%s', (workflowPath: string): void => {
  it('should validate every agent skill', async (): Promise<void> => {
    const workflow: string = await readFile(workflowPath, 'utf8');
    const workflowJson: unknown = parse(workflow);
    expect(workflowJson).toHaveProperty(
      'jobs.skills.strategy.matrix.skill',
      skillNames,
    );
  });
});
