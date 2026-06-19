import { EOL } from 'node:os';
import { describe, expect, it } from 'vitest';
import {
  MARKDOWNLINT_ARGS,
  type MarkdownlintRunner,
  runMarkdownlint,
} from './markdownlint.js';

describe('runMarkdownlint', (): void => {
  it('should run markdownlint against Markdown files', async (): Promise<void> => {
    const calls: string[][] = [];
    const runner: MarkdownlintRunner = (
      ...args: readonly string[]
    ): Promise<{
      readonly exitCode: number;
      readonly stderr: string;
      readonly stdout: string;
    }> => {
      calls.push([...args]);
      return Promise.resolve({
        exitCode: 0,
        stderr: '',
        stdout: '',
      });
    };

    const result = await runMarkdownlint({
      runner,
    });

    expect(calls).toEqual([[...MARKDOWNLINT_ARGS]]);
    expect(result).toEqual({
      status: 'success',
    });
  });

  it('should not disable repository-specific rules by default', (): void => {
    expect(MARKDOWNLINT_ARGS).not.toContain('MD013');
    expect(MARKDOWNLINT_ARGS).not.toContain('MD033');
    expect(MARKDOWNLINT_ARGS).not.toContain('MD041');
    expect(MARKDOWNLINT_ARGS).not.toContain('MD060');
  });

  it('should ignore workspace packages from the root scan', (): void => {
    expect(MARKDOWNLINT_ARGS).toContain('packages/**');
  });

  it('should not report an empty output path on success', async (): Promise<void> => {
    const runner: MarkdownlintRunner = (): Promise<{
      readonly exitCode: number;
      readonly stderr: string;
      readonly stdout: string;
    }> =>
      Promise.resolve({
        exitCode: 0,
        stderr: '',
        stdout: '',
      });

    const result = await runMarkdownlint({
      outputPath: '.tests/markdownlint.txt',
      runner,
    });

    expect(result).toEqual({
      status: 'success',
    });
  });

  it('should pass a discovered config before markdown globs and variadic flags', async (): Promise<void> => {
    const calls: string[][] = [];
    const runner: MarkdownlintRunner = (
      ...args: readonly string[]
    ): Promise<{
      readonly exitCode: number;
      readonly stderr: string;
      readonly stdout: string;
    }> => {
      calls.push([...args]);
      return Promise.resolve({
        exitCode: 0,
        stderr: '',
        stdout: '',
      });
    };

    await runMarkdownlint({
      configPath: '../../.markdownlint.jsonc',
      runner,
    });

    expect(calls).toEqual([
      [
        'markdownlint',
        '--config',
        '../../.markdownlint.jsonc',
        ...MARKDOWNLINT_ARGS.slice(1),
      ],
    ]);
  });

  it('should return a failure report when markdownlint fails', async (): Promise<void> => {
    const runner: MarkdownlintRunner = (): Promise<{
      readonly exitCode: number;
      readonly stderr: string;
      readonly stdout: string;
    }> =>
      Promise.resolve({
        exitCode: 1,
        stderr: 'stderr output',
        stdout: 'stdout output',
      });

    const result = await runMarkdownlint({
      runner,
    });

    expect(result).toEqual({
      context:
        'Markdownlint encountered an error while analyzing this package for ' +
        'Markdown style and formatting issues.',
      message: ['stdout output', 'stderr output'].join(EOL),
      status: 'failure',
    });
  });

  it('should include the exit code when markdownlint fails without output', async (): Promise<void> => {
    const runner: MarkdownlintRunner = (): Promise<{
      readonly exitCode: number;
      readonly stderr: string;
      readonly stdout: string;
    }> =>
      Promise.resolve({
        exitCode: 2,
        stderr: '',
        stdout: '',
      });

    const result = await runMarkdownlint({
      runner,
    });

    expect(result).toEqual({
      context:
        'Markdownlint encountered an error while analyzing this package for ' +
        'Markdown style and formatting issues.',
      message: 'Markdownlint failed with exit code 2.',
      status: 'failure',
    });
  });

  it('should write markdownlint output to the report path', async (): Promise<void> => {
    const calls: string[][] = [];
    const runner: MarkdownlintRunner = (
      ...args: readonly string[]
    ): Promise<{
      readonly exitCode: number;
      readonly stderr: string;
      readonly stdout: string;
    }> => {
      calls.push([...args]);
      return Promise.resolve({
        exitCode: 1,
        stderr: '',
        stdout: '',
      });
    };

    const result = await runMarkdownlint({
      outputPath: '.tests/markdownlint.txt',
      outputReader: (): Promise<string> => Promise.resolve('file output'),
      runner,
    });

    expect(calls).toEqual([
      [
        'markdownlint',
        '--output',
        '.tests/markdownlint.txt',
        ...MARKDOWNLINT_ARGS.slice(1),
      ],
    ]);
    expect(result).toEqual({
      context:
        'Markdownlint encountered an error while analyzing this package for ' +
        'Markdown style and formatting issues.',
      message: 'file output',
      path: '.tests/markdownlint.txt',
      status: 'failure',
    });
  });

  it('should read report failures from the markdownlint output file', async (): Promise<void> => {
    const runner: MarkdownlintRunner = (): Promise<{
      readonly exitCode: number;
      readonly stderr: string;
      readonly stdout: string;
    }> =>
      Promise.resolve({
        exitCode: 1,
        stderr: 'stderr output',
        stdout: 'stdout output',
      });

    const result = await runMarkdownlint({
      outputPath: '.tests/markdownlint.txt',
      outputReader: (): Promise<string> => Promise.resolve('file output'),
      runner,
    });

    expect(result).toEqual({
      context:
        'Markdownlint encountered an error while analyzing this package for ' +
        'Markdown style and formatting issues.',
      message: 'file output',
      path: '.tests/markdownlint.txt',
      status: 'failure',
    });
  });
});
