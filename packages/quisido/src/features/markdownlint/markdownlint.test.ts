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
      path: undefined,
      status: 'success',
    });
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
      path: undefined,
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
      path: undefined,
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
      [...MARKDOWNLINT_ARGS, '--output', '.tests/markdownlint.txt'],
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
});
