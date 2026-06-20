import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const WORKFLOW_DIRECTORY = join(import.meta.dirname, '..', 'workflows');

const readWorkflow = async (workflowName: string): Promise<string> =>
  readFile(join(WORKFLOW_DIRECTORY, workflowName), 'utf8');

describe('Codex workflows', (): void => {
  it('should support explicit Codex plan and execute modes', async (): Promise<void> => {
    const action = await readFile(
      join(import.meta.dirname, '..', 'actions', 'codex', 'action.yml'),
      'utf8',
    );

    expect(action).toContain('mode:');
    expect(action).toContain('default: default');
    expect(action).toContain('case "$CODEX_MODE" in');
    expect(action).toContain('plan)');
    expect(action).toContain('execute)');
  });

  it('should run issue tags as planning only', async (): Promise<void> => {
    const workflow = await readWorkflow('issues.yml');

    expect(workflow).toContain("github.actor != 'quisido-codex[bot]'");
    expect(workflow).toContain("contains(github.event.issue.body, '@codex')");
    expect(workflow).toContain('mode: plan');
    expect(workflow).not.toContain('mode: execute');
  });

  it('should execute only newly created Codex issue and pull request plan comments', async (): Promise<void> => {
    const workflow = await readWorkflow('issue-comment.yml');

    expect(workflow).toContain("github.actor != 'quisido-codex[bot]'");
    expect(workflow).toContain('mode: plan');
    expect(workflow).toContain("github.actor == 'quisido-codex[bot]'");
    expect(workflow).toContain("github.event.action == 'created'");
    expect(workflow).toContain("contains(github.event.comment.body, '@codex')");
    expect(workflow).toContain('mode: execute');
    expect(workflow).toMatch(
      /codex-issue-plan:[\s\S]*?permissions:[\s\S]*?contents: read/u,
    );
    expect(workflow).toMatch(
      /codex-issue-execute:[\s\S]*?permissions:[\s\S]*?contents: write/u,
    );
    expect(workflow).toMatch(
      /codex-pull-request-plan:[\s\S]*?permissions:[\s\S]*?contents: read/u,
    );
    expect(workflow).toMatch(
      /codex-pull-request-execute:[\s\S]*?permissions:[\s\S]*?contents: write/u,
    );
  });

  it('should execute only newly created Codex review plan replies', async (): Promise<void> => {
    const workflow = await readWorkflow('pull-request-review-comment.yml');

    expect(workflow).toContain("github.actor != 'quisido-codex[bot]'");
    expect(workflow).toContain('mode: plan');
    expect(workflow).toContain("github.actor == 'quisido-codex[bot]'");
    expect(workflow).toContain("github.event.action == 'created'");
    expect(workflow).toContain("contains(github.event.comment.body, '@codex')");
    expect(workflow).toContain('mode: execute');
    expect(workflow).toMatch(
      /codex-plan:[\s\S]*?permissions:[\s\S]*?contents: read/u,
    );
    expect(workflow).toMatch(
      /codex-execute:[\s\S]*?permissions:[\s\S]*?contents: write/u,
    );
  });

  it('should keep the scheduled Codex workflow one-shot', async (): Promise<void> => {
    const workflow = await readWorkflow('cron-days-5.yml');

    expect(workflow).toContain('uses: ./.github/actions/codex');
    expect(workflow).not.toContain('mode: plan');
    expect(workflow).not.toContain('mode: execute');
  });
});
