import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

interface ExpectedSkill {
  readonly descriptionText: string;
  readonly directoryName: string;
  readonly heading: string;
  readonly name: string;
}

interface NodeError extends Error {
  readonly code?: string | undefined;
}

const EXPECTED_SKILLS: readonly ExpectedSkill[] = [
  {
    descriptionText: 'Cloudflare Workers',
    directoryName: 'cloudflare',
    heading: 'Cloudflare Workers Guidelines',
    name: 'cloudflare',
  },
  {
    descriptionText: 'React',
    directoryName: 'react',
    heading: 'React Guidelines',
    name: 'react',
  },
  {
    descriptionText: 'testing',
    directoryName: 'testing',
    heading: 'Testing Guidelines',
    name: 'testing',
  },
  {
    descriptionText: 'TypeScript',
    directoryName: 'typescript',
    heading: 'TypeScript Guidelines',
    name: 'typescript',
  },
];

const LEGACY_INSTRUCTIONS_DIRECTORY = join(
  import.meta.dirname,
  '.github',
  'instructions',
);
const SKILLS_DIRECTORY = join(import.meta.dirname, '.agents', 'skills');

const isNotFoundError = (error: unknown): error is NodeError => {
  return error instanceof Error && (error as NodeError).code === 'ENOENT';
};

const mapDirectoryToFileNames = async (
  directory: string,
): Promise<readonly string[]> => {
  try {
    return await readdir(directory);
  } catch (error: unknown) {
    if (isNotFoundError(error)) {
      return [];
    }
    throw error;
  }
};

describe('agent skills', (): void => {
  it('should not use legacy GitHub instruction files', async (): Promise<void> => {
    await expect(
      mapDirectoryToFileNames(LEGACY_INSTRUCTIONS_DIRECTORY),
    ).resolves.toStrictEqual([]);
  });

  it('should expose each instruction topic as a skill', async (): Promise<void> => {
    const directoryNames: readonly string[] = await readdir(SKILLS_DIRECTORY);
    expect(directoryNames).toStrictEqual(
      EXPECTED_SKILLS.map(({ directoryName }: ExpectedSkill): string => {
        return directoryName;
      }),
    );

    await Promise.all(
      EXPECTED_SKILLS.map(
        async (expectedSkill: ExpectedSkill): Promise<void> => {
          const skillMarkdown: string = await readFile(
            join(SKILLS_DIRECTORY, expectedSkill.directoryName, 'SKILL.md'),
            'utf8',
          );

          expect(skillMarkdown).toMatch(/^---\n/u);
          expect(skillMarkdown).toContain(`name: ${expectedSkill.name}\n`);
          expect(skillMarkdown).toContain('description: ');
          expect(skillMarkdown).toContain(expectedSkill.descriptionText);
          expect(skillMarkdown).toContain(`# ${expectedSkill.heading}`);
          expect(skillMarkdown).not.toContain('applyTo:');
        },
      ),
    );
  });
});
