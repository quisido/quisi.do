import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const SKILL_DIRECTORY = join('.agents', 'skills');
const SKILL_MATRIX_EXPRESSION = `\${{ matrix.skill }}`;
const SKILLS_REF_REVISION = '5d4c1fda3f786fff826c7f56b6cb3341e7f3a911';
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
  it('should validate every agent skill with skills-ref', async (): Promise<void> => {
    const workflow: string = await readFile(workflowPath, 'utf8');

    expect(workflow).toMatch(/^ {2}skills:\n {4}name: Skills$/mu);
    expect(workflow).toContain('        uses: astral-sh/setup-uv@v8');
    expect(workflow).toContain(
      `git+https://github.com/agentskills/agentskills.git@${SKILLS_REF_REVISION}#subdirectory=skills-ref`,
    );
    expect(workflow).toContain(
      '          skills-ref\n' +
        '          validate\n' +
        `          ".agents/skills/${SKILL_MATRIX_EXPRESSION}"`,
    );

    for (const skillName of skillNames) {
      expect(workflow).toContain(`          - ${skillName}`);
    }
  });
});
